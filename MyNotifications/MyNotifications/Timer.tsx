import React, { Component } from 'react';
import {Text} from "@fluentui/react";

interface TimerProps {
  expiredTime: Date; // Expired time as a Date object
}

interface TimerState {
  remainingTime: number; // Remaining time in milliseconds
}

class Timer extends Component<TimerProps, TimerState> {
  private timerId: number | null = null;

  constructor(props: TimerProps) {
    super(props);
    this.state = {
      remainingTime: this.calculateRemainingTime(),
    };
  }

  componentDidMount() {
    this.startCountdown();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  calculateRemainingTime(): number {
    const now = new Date().getTime();
    const expiry = this.props.expiredTime.getTime();
    return Math.max(expiry - now, 0);
  }

  startCountdown() {
    this.timerId = window.setInterval(() => {
      this.setState({ remainingTime: this.calculateRemainingTime() }, () => {
        if (this.state.remainingTime <= 0) {
          this.clearTimer();
        }
      });
    }, 1000);
  }

  clearTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  render() {
    const { remainingTime } = this.state;
    return (
      <Text> Expires In: {this.formatTime(remainingTime)}</Text>
    );
  }
}

export default Timer;