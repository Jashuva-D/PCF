import * as React from 'react';
import {
    ChoiceGroup,
    createTheme,
    DefaultButton,
    Dropdown,
    initializeIcons,
    PrimaryButton,
    TextField,
    ThemeProvider
} from '@fluentui/react';
import './App.css';

initializeIcons();

const theme = createTheme({
    palette: {
        themePrimary: '#0D2499',
        themeDark: '#091a70',
        themeDarker: '#06124d'
    },
    defaultFontStyle: {
        fontFamily: 'Segoe UI, sans-serif'
    }
});

const dropdownStyles = {
    root: { width: '100%' },
    title: {
        border: '1px solid #b8c2d1',
        borderRadius: 5,
        backgroundColor: '#ffffff'
    },
    caretDownWrapper: {
        color: '#0D2499'
    }
};

const monthOptions = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
].map((month, index) => ({
    key: index + 1,
    text: month
}));

const optionPeriodOptions = Array.from({ length: 6 }, (_, index) => ({
    key: `OP${index + 1}`,
    text: `OP${index + 1}`
}));

type BudgetSource = 'OIT' | 'OC';

interface ISchedule {
    id: string;
    optionPeriod: string;
    budgetSource: BudgetSource;
    budgetedAmount: number;
    availableBalance: number;
}

interface IAllocationDraft {
    allocationAmount: string;
    notes: string;
}

interface IConfirmationRow {
    id: string;
    optionPeriod: string;
    allocationAmount: number;
    remainingAfter: number;
    notes: string;
}

interface IConfirmation {
    invoiceMonth: number;
    optionPeriod: string;
    budgetSource: BudgetSource;
    monthlyBillingAmount: number;
    totalAllocated: number;
    unallocatedAmount: number;
    confirmedBy: string;
    confirmationDate: string;
    rows: IConfirmationRow[];
}

interface IAppState {
    invoiceMonth: number | null;
    optionPeriod: string | null;
    budgetSource: BudgetSource;
    monthlyBillingAmount: string;
    searchText: string;
    drafts: Record<string, IAllocationDraft>;
    confirmation: IConfirmation | null;
}

const formatCurrency = (value: number): string =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(value);

const toAmount = (value: string): number => {
    const amount = Number(value);
    return Number.isFinite(amount) ? amount : 0;
};

const sampleSchedules: ISchedule[] = optionPeriodOptions.flatMap(period =>
    (['OIT', 'OC'] as BudgetSource[]).flatMap(budgetSource =>
        [
            { budgetedAmount: 500000, availableBalance: 170000 },
            { budgetedAmount: 400000, availableBalance: 150000 },
            { budgetedAmount: 300000, availableBalance: 100000 },
            { budgetedAmount: 200000, availableBalance: 75000 },
            { budgetedAmount: 150000, availableBalance: 60000 }
        ].map((amounts, index) => ({
            id: `${period.key}-${budgetSource}-SCH-00${index + 1}`,
            optionPeriod: period.key,
            budgetSource,
            ...amounts
        }))
    )
);

export default class App extends React.Component<object, IAppState> {
    private confirmationHeading = React.createRef<HTMLHeadingElement>();

    public state: IAppState = {
        invoiceMonth: null,
        optionPeriod: null,
        budgetSource: 'OIT',
        monthlyBillingAmount: '250000',
        searchText: '',
        drafts: {},
        confirmation: null
    };

    private getDraftKey = (scheduleId: string): string =>
        `${this.state.invoiceMonth}-${scheduleId}`;

    private getDraft = (scheduleId: string): IAllocationDraft =>
        this.state.drafts[this.getDraftKey(scheduleId)] ?? {
            allocationAmount: '',
            notes: ''
        };

    private getSelectedSchedules = (): ISchedule[] =>
        sampleSchedules.filter(schedule =>
            schedule.optionPeriod === this.state.optionPeriod &&
            schedule.budgetSource === this.state.budgetSource
        );

    private updateDraft = (scheduleId: string, field: keyof IAllocationDraft, value: string): void => {
        const key = this.getDraftKey(scheduleId);

        this.setState(previousState => ({
            drafts: {
                ...previousState.drafts,
                [key]: {
                    ...(previousState.drafts[key] ?? { allocationAmount: '', notes: '' }),
                    [field]: value
                }
            }
        }));
    };

    private clearEntries = (): void => {
        this.setState({
            monthlyBillingAmount: '',
            searchText: '',
            drafts: {}
        });
    };

    private confirmAllocation = (): void => {
        const { invoiceMonth, optionPeriod, budgetSource, monthlyBillingAmount } = this.state;

        if (invoiceMonth === null || optionPeriod === null) {
            return;
        }

        const rows = this.getSelectedSchedules().map(schedule => {
            const draft = this.getDraft(schedule.id);
            const allocationAmount = toAmount(draft.allocationAmount);

            return {
                id: schedule.id,
                optionPeriod: schedule.optionPeriod,
                allocationAmount,
                remainingAfter: schedule.availableBalance - allocationAmount,
                notes: draft.notes
            };
        }).filter(row => row.allocationAmount !== 0);

        const totalAllocated = rows.reduce((total, row) => total + row.allocationAmount, 0);
        const billingAmount = toAmount(monthlyBillingAmount);

        this.setState({
            confirmation: {
                invoiceMonth,
                optionPeriod,
                budgetSource,
                monthlyBillingAmount: billingAmount,
                totalAllocated,
                unallocatedAmount: billingAmount - totalAllocated,
                confirmedBy: 'Current User',
                confirmationDate: new Date().toLocaleDateString('en-US'),
                rows
            }
        }, () => {
            this.confirmationHeading.current?.focus();
        });
    };

    private createAnotherAllocation = (): void => {
        this.setState({
            invoiceMonth: null,
            optionPeriod: null,
            budgetSource: 'OIT',
            monthlyBillingAmount: '',
            searchText: '',
            drafts: {},
            confirmation: null
        });
    };

    private renderConfirmation = (confirmation: IConfirmation): React.ReactNode => {
        const monthName = monthOptions.find(month => month.key === confirmation.invoiceMonth)?.text;

        return (
            <main className="cost-recovery-page confirmation-page">
                <p className="page-description">Read-only confirmation</p>

                <div className="confirmation-banner">
                    <h1 ref={this.confirmationHeading} tabIndex={-1}>
                        ✓ Allocation Completed Successfully
                    </h1>
                </div>

                <section className="confirmation-summary" aria-labelledby="allocation-summary-heading">
                    <h2 id="allocation-summary-heading">Allocation Summary</h2>

                    <dl className="confirmation-summary-grid">
                        <div>
                            <dt>Invoice Month</dt>
                            <dd>{monthName}</dd>
                        </div>

                        <div>
                            <dt>Option Period</dt>
                            <dd>{confirmation.optionPeriod}</dd>
                        </div>

                        <div>
                            <dt>Budget Source/Group</dt>
                            <dd>{confirmation.budgetSource}</dd>
                        </div>

                        <div>
                            <dt>Monthly Billing Amount</dt>
                            <dd>{formatCurrency(confirmation.monthlyBillingAmount)}</dd>
                        </div>

                        <div>
                            <dt>Total Allocated</dt>
                            <dd>{formatCurrency(confirmation.totalAllocated)}</dd>
                        </div>

                        <div>
                            <dt>Unallocated Amount</dt>
                            <dd>{formatCurrency(confirmation.unallocatedAmount)}</dd>
                        </div>
                    </dl>
                </section>

                <section className="confirmation-schedules" aria-labelledby="confirmed-schedules-heading">
                    <h2 id="confirmed-schedules-heading">Confirmed Schedule Allocations</h2>

                    <div className="schedule-table-container">
                        <table className="schedule-table">
                            <caption className="visually-hidden">Confirmed Schedule Allocations</caption>

                            <colgroup>
                                <col style={{ width: '20%' }} />
                                <col style={{ width: '12%' }} />
                                <col style={{ width: '18%' }} />
                                <col style={{ width: '24%' }} />
                                <col style={{ width: '26%' }} />
                            </colgroup>

                            <thead>
                                <tr>
                                    <th scope="col">Schedule ID</th>
                                    <th scope="col">Option Period</th>
                                    <th scope="col">Allocated Amount</th>
                                    <th scope="col">Remaining Balance (After)</th>
                                    <th scope="col">Notes</th>
                                </tr>
                            </thead>

                            <tbody>
                                {confirmation.rows.map(row => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.optionPeriod}</td>
                                        <td>{formatCurrency(row.allocationAmount)}</td>
                                        <td>{formatCurrency(row.remainingAfter)}</td>
                                        <td className="confirmation-notes">{row.notes}</td>
                                    </tr>
                                ))}

                                {confirmation.rows.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="empty-message">
                                            No allocation amounts entered.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                <div className="confirmation-audit">
                    <span><strong>Confirmed By:</strong> {confirmation.confirmedBy}</span>
                    <span><strong>Confirmation Date:</strong> {confirmation.confirmationDate}</span>
                </div>

                <div className="confirmation-actions">
                    <DefaultButton text="Go to Transactions" />

                    <PrimaryButton
                        text="Create Another Allocation"
                        onClick={this.createAnotherAllocation}
                    />
                </div>
            </main>
        );
    };

    public render(): React.ReactNode {
        if (this.state.confirmation) {
            return (
                <ThemeProvider theme={theme}>
                    {this.renderConfirmation(this.state.confirmation)}
                </ThemeProvider>
            );
        }

        const { invoiceMonth, optionPeriod, budgetSource, monthlyBillingAmount, searchText } = this.state;

        const showSchedules = invoiceMonth !== null && optionPeriod !== null;
        const selectedSchedules = this.getSelectedSchedules();

        const visibleSchedules = selectedSchedules.filter(schedule =>
            schedule.id.toLowerCase().includes(searchText.trim().toLowerCase())
        );

        const totalAllocated = selectedSchedules.reduce((total, schedule) =>
            total + toAmount(this.getDraft(schedule.id).allocationAmount), 0
        );

        const billingAmount = toAmount(monthlyBillingAmount);
        const unallocatedAmount = billingAmount - totalAllocated;

        return (
            <ThemeProvider theme={theme}>
                <main className="cost-recovery-page">
                    <h1>PRISM Cost Recovery</h1>

                    <p className="page-description">
                        All inputs and inline schedule allocations on one page
                    </p>

                    <section className="invoice-panel" aria-label="Invoice details">
                        <Dropdown
                            label="Invoice Month"
                            placeholder="Select Month"
                            required
                            selectedKey={invoiceMonth}
                            options={monthOptions}
                            styles={dropdownStyles}
                            onChange={(_, option) => {
                                if (option) {
                                    this.setState({ invoiceMonth: Number(option.key) });
                                }
                            }}
                        />

                        <Dropdown
                            label="Option Period"
                            placeholder="Select Option Period"
                            required
                            selectedKey={optionPeriod}
                            options={optionPeriodOptions}
                            styles={dropdownStyles}
                            onChange={(_, option) => {
                                if (option) {
                                    this.setState({ optionPeriod: String(option.key) });
                                }
                            }}
                        />

                        <ChoiceGroup
                            label="Budget Source/Group"
                            required
                            className="budget-source-options"
                            selectedKey={budgetSource}
                            options={[
                                { key: 'OIT', text: 'OIT' },
                                { key: 'OC', text: 'OC' }
                            ]}
                            onChange={(_, option) => {
                                if (option) {
                                    this.setState({ budgetSource: option.key as BudgetSource });
                                }
                            }}
                        />

                        <TextField
                            label="Monthly Billing Amount"
                            required
                            prefix="$"
                            type="number"
                            min={0}
                            step="0.01"
                            className="editable-field"
                            value={monthlyBillingAmount}
                            onChange={(_, value) => this.setState({ monthlyBillingAmount: value ?? '' })}
                        />
                    </section>

                    {showSchedules && (
                        <section className="schedules-section" aria-labelledby="schedules-heading">
                            <div className="schedules-toolbar">
                                <h2 id="schedules-heading">
                                    Schedules and Available Budgets — {budgetSource} ({optionPeriod})
                                </h2>

                                <TextField
                                    label="Search schedules"
                                    placeholder="Search by Schedule ID..."
                                    className="schedule-search"
                                    value={searchText}
                                    onChange={(_, value) => this.setState({ searchText: value ?? '' })}
                                />
                            </div>

                            <div className="schedule-table-container">
                                <table className="schedule-table">
                                    <caption className="visually-hidden">Schedule budgets and allocations</caption>

                                    <colgroup>
                                        <col style={{ width: '15%' }} />
                                        <col style={{ width: '9%' }} />
                                        <col style={{ width: '9%' }} />
                                        <col style={{ width: '13%' }} />
                                        <col style={{ width: '13%' }} />
                                        <col style={{ width: '13%' }} />
                                        <col style={{ width: '13%' }} />
                                        <col style={{ width: '15%' }} />
                                    </colgroup>

                                    <thead>
                                        <tr>
                                            <th scope="col">Schedule ID</th>
                                            <th scope="col">Option Period</th>
                                            <th scope="col">Budget Source</th>
                                            <th scope="col">Budgeted Amount</th>
                                            <th scope="col">Available Balance</th>
                                            <th scope="col">Allocation Amount</th>
                                            <th scope="col">Remaining (After)</th>
                                            <th scope="col">Notes</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {visibleSchedules.map(schedule => {
                                            const draft = this.getDraft(schedule.id);
                                            const remainingAfter = schedule.availableBalance - toAmount(draft.allocationAmount);

                                            return (
                                                <tr key={schedule.id}>
                                                    <td>{schedule.id}</td>
                                                    <td>{schedule.optionPeriod}</td>
                                                    <td>{schedule.budgetSource}</td>
                                                    <td>{formatCurrency(schedule.budgetedAmount)}</td>
                                                    <td>{formatCurrency(schedule.availableBalance)}</td>

                                                    <td className="editable-cell">
                                                        <TextField
                                                            ariaLabel={`Allocation amount for ${schedule.id}`}
                                                            prefix="$"
                                                            type="number"
                                                            min={0}
                                                            step="0.01"
                                                            className="editable-field"
                                                            value={draft.allocationAmount}
                                                            onChange={(_, value) => this.updateDraft(schedule.id, 'allocationAmount', value ?? '')}
                                                        />
                                                    </td>

                                                    <td>{formatCurrency(remainingAfter)}</td>

                                                    <td className="editable-cell">
                                                        <TextField
                                                            ariaLabel={`Notes for ${schedule.id}`}
                                                            className="editable-field"
                                                            value={draft.notes}
                                                            onChange={(_, value) => this.updateDraft(schedule.id, 'notes', value ?? '')}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })}

                                        {visibleSchedules.length === 0 && (
                                            <tr>
                                                <td colSpan={8} className="empty-message">
                                                    No schedules found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="summary-cards" aria-label="Allocation summary">
                                <div className="summary-card">
                                    <span>Monthly Billing Amount</span>
                                    <strong>{formatCurrency(billingAmount)}</strong>
                                </div>

                                <div className="summary-card">
                                    <span>Total Allocated</span>
                                    <strong>{formatCurrency(totalAllocated)}</strong>
                                </div>

                                <div className="summary-card unallocated-card">
                                    <span>Unallocated Amount</span>
                                    <strong>{formatCurrency(unallocatedAmount)}</strong>
                                </div>
                            </div>

                            <div className="page-footer">
                                <span className="editable-legend">Editable by user</span>

                                <div className="footer-actions">
                                    <DefaultButton text="Clear Entries" onClick={this.clearEntries} />
                                    <PrimaryButton text="Confirm Allocation" onClick={this.confirmAllocation} />
                                </div>
                            </div>
                        </section>
                    )}
                </main>
            </ThemeProvider>
        );
    }
}