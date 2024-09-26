class Snowflake {
  constructor(epoch = 1577836800000n) {
    this.epoch = epoch;
    this.sequence = 0n;
    this.machineId = 1n;
    this.lastTimestamp = 0n;

    this.machineIdShift = 12n;
    this.timestampLeftShift = 22n;
    this.sequenceMask = 4095n;
  }

  nextId() {
    let timestamp = this.currentTime();
    if (timestamp === this.lastTimestamp) {
      this.sequence = (this.sequence + 1n) & this.sequenceMask;
      if (this.sequence === 0n) {
        timestamp = this.waitNextMillis(this.lastTimestamp);
      }
    } else {
      this.sequence = 0n;
    }

    this.lastTimestamp = timestamp;
    return (
      ((timestamp - this.epoch) << this.timestampLeftShift) |
      (this.machineId << this.machineIdShift) |
      this.sequence
    );
  }

  currentTime() {
    return BigInt(Date.now());
  }

  waitNextMillis(lastTimestamp) {
    let timestamp = this.currentTime();
    while (timestamp <= lastTimestamp) {
      timestamp = this.currentTime();
    }
    return timestamp;
  }
}

module.exports = Snowflake;
