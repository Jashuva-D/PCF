
import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import "./HiringActions.css";

interface HiringAction {
  id: string;
  hiringId: string;
  jobTitle: string;
  currentStage: string;
  daysInStage: string;
}

interface DataverseRecord {
  hr_hiringactionid: string;
  hr_hiringid?: string;
  hr_positiontitle?: string;
  hr_currenthiringstage?: string | number;
  hr_daysincurrentstage?: number | null;
  [key: string]: unknown;
}

interface XrmContext {
  WebApi: {
    retrieveMultipleRecords: (
      entityLogicalName: string,
      options?: string
    ) => Promise<{ entities: DataverseRecord[] }>;
  };
  Navigation: {
    navigateTo: (
      pageInput: {
        pageType: string;
        entityName: string;
        viewType?: string;
      },
      navigationOptions?: {
        target?: number;
      }
    ) => Promise<unknown>;
  };
}

interface ColumnDefinition {
  key: keyof HiringAction;
  label: string;
  width: number;
  minWidth: number;
}

const initialColumns: ColumnDefinition[] = [
  { key: "hiringId", label: "Hiring ID", width: 150, minWidth: 100 },
  { key: "jobTitle", label: "Job Title", width: 230, minWidth: 120 },
  { key: "currentStage", label: "Current Stage", width: 180, minWidth: 120 },
  { key: "daysInStage", label: "Days in Stage", width: 140, minWidth: 100 },
];

function getXrm(): XrmContext {
  const crmWindow = window.parent as Window & {
    Xrm?: XrmContext;
  };

  if (!crmWindow.Xrm) {
    throw new Error("Dynamics 365 context is unavailable.");
  }

  return crmWindow.Xrm;
}

function HiringActions() {
  const [records, setRecords] = useState<HiringAction[]>([]);
  const [columns, setColumns] = useState(initialColumns);
  const [containerWidth, setContainerWidth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const resizeRef = useRef<{
    index: number;
    startX: number;
    startWidth: number;
  } | null>(null);

  const totalWidth = columns.reduce(
    (sum, column) => sum + column.width,
    0
  );

  const effectiveTableWidth = Math.max(totalWidth, containerWidth);

  const effectiveColumnWidths =
    totalWidth < containerWidth
      ? columns.map(
          (column) =>
            (column.width / totalWidth) * containerWidth
        )
      : columns.map((column) => column.width);

  useEffect(() => {
    let active = true;

    async function loadHiringActions() {
      try {
        setLoading(true);
        setError(null);

        const xrm = getXrm();

        const query =
          "?$select=hr_hiringactionid,hr_hiringid,hr_positiontitle," +
          "hr_currenthiringstage,hr_daysincurrentstage" +
          "&$orderby=createdon desc&$top=4";

        const response = await xrm.WebApi.retrieveMultipleRecords(
          "hr_hiringaction",
          query
        );

        const hiringActions = response.entities.map((record) => {
          const stageLabel =
            record[
              "hr_currenthiringstage@OData.Community.Display.V1.FormattedValue"
            ];

          return {
            id: record.hr_hiringactionid,
            hiringId: String(record.hr_hiringid ?? "—"),
            jobTitle: String(record.hr_positiontitle ?? "—"),
            currentStage: String(
              stageLabel ?? record.hr_currenthiringstage ?? "—"
            ),
            daysInStage:
              record.hr_daysincurrentstage == null
                ? "—"
                : String(record.hr_daysincurrentstage),
          };
        });

        if (active) {
          setRecords(hiringActions);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to retrieve hiring actions."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadHiringActions();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const container = tableContainerRef.current;

    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      setContainerWidth(width);
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const resize = resizeRef.current;

      if (!resize) return;

      const delta = event.clientX - resize.startX;

      setColumns((previous) =>
        previous.map((column, index) =>
          index === resize.index
            ? {
                ...column,
                width: Math.max(
                  column.minWidth,
                  resize.startWidth + delta
                ),
              }
            : column
        )
      );
    };

    const handlePointerUp = () => {
      resizeRef.current = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, []);

  const startResize = (
    event: ReactPointerEvent<HTMLSpanElement>,
    index: number
  ) => {
    event.preventDefault();

    resizeRef.current = {
      index,
      startX: event.clientX,
      startWidth: effectiveColumnWidths[index],
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const handleViewAll = async () => {
    try {
      const xrm = getXrm();

      await xrm.Navigation.navigateTo({
        pageType: "entitylist",
        entityName: "hr_hiringaction",
        viewType: "savedquery",
      });
    } catch (err) {
      console.error("Unable to open Hiring Actions:", err);
      alert("Unable to open Hiring Actions.");
    }
  };

  return (
    <section className="hiring-actions">
      <div className="hiring-actions-header">
        <h2>My Hiring Actions</h2>

        <button
          type="button"
          className="hiring-actions-view-all"
          onClick={handleViewAll}
        >
          View All
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14m-6-6 6 6-6 6" />
          </svg>
        </button>
      </div>

      <div
        className="hiring-actions-table-container"
        ref={tableContainerRef}
      >
        <table
          className="hiring-actions-table"
          style={{ width: `${effectiveTableWidth}px` }}
        >
          <colgroup>
            {columns.map((column, index) => (
              <col
                key={column.key}
                style={{
                  width: `${effectiveColumnWidths[index]}px`,
                }}
              />
            ))}
          </colgroup>

          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={column.key}>
                  <span className="hiring-actions-column-label">
                    {column.label}
                  </span>

                  <span
                    className="hiring-actions-resize-handle"
                    role="separator"
                    aria-label={`Resize ${column.label} column`}
                    aria-orientation="vertical"
                    onPointerDown={(event) =>
                      startResize(event, index)
                    }
                  />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading || error || records.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className={`hiring-actions-message ${
                    error ? "hiring-actions-error" : ""
                  }`}
                >
                  {loading
                    ? "Loading hiring actions..."
                    : error
                      ? error
                      : "No hiring actions found."}
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr key={record.id}>
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={
                        column.key === "hiringId"
                          ? "hiring-actions-id"
                          : column.key === "daysInStage"
                            ? "hiring-actions-days"
                            : ""
                      }
                    >
                      {column.key === "currentStage" ? (
                        <span className="hiring-actions-stage">
                          {record[column.key]}
                        </span>
                      ) : (
                        record[column.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default HiringActions;
