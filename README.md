# Snowflake ID Generator

A **64-bit Snowflake-like ID generator** for Node.js. Inspired by [Twitter's Snowflake ID system](https://blog.twitter.com/engineering/en_us/a/2010/announcing-snowflake), this package generates globally unique IDs using a combination of timestamps, machine identifiers, and sequence numbers.

## Features

- **64-bit Unique IDs**: IDs are generated using the current time, a machine identifier, and a sequence number, ensuring uniqueness across distributed systems.
- **Custom Epoch**: You can define your own epoch to reduce the size of the generated IDs.
- **High Throughput**: Generates thousands of unique IDs per second.
- **No Dependencies**: This package is lightweight and has no external dependencies.

## Installation

Install the package via npm:

```bash
npm install microflake-idgen
```

## Usage

Here’s a basic example of how to use the Snowflake class:

```bash
const Snowflake = require('microflake-idgen');

// Create a new Snowflake instance with a custom epoch (optional)
const snowflake = new Snowflake();

// Generate a new unique ID
const uniqueId = snowflake.nextId();
console.log(uniqueId.toString());  // Prints the ID in string format
```

## Options

You can pass in optional parameters when creating a new instance of the Snowflake class:

```bash
const snowflake = new Snowflake({
  epoch: 1609459200000n,   // Custom epoch (January 1, 2021)
  machineId: 5n            // Machine identifier (up to 1023)
});
```

- epoch (default: 1577836800000n): The custom epoch (in milliseconds) from which the time part of the ID is calculated. By default, it is set to January 1, 2020.
- machineId (default: 1n): The machine or worker ID (10 bits, max value 1023n). This is useful for distributed systems where each node can have a unique machine ID.


## Options

new Snowflake([options])
Creates a new instance of the Snowflake generator.

options.epoch - A BigInt timestamp for the custom epoch (optional).
options.machineId - A BigInt representing the machine ID (optional).
.nextId()
Generates the next unique 64-bit ID.

Example Output

```bash
const id = snowflake.nextId();
console.log(id.toString()); // '451247856981582848'
```

## How it Works

The 64-bit ID is composed of:

- 42 bits for the timestamp (milliseconds since the custom epoch).
- 10 bits for the machine or worker ID.
- 12 bits for a sequence number (to handle multiple IDs in the same millisecond).


This ensures that the IDs are unique across multiple machines and over time.


## License

This project is licensed under the MIT License. See the LICENSE file for details.


## Contributing

Feel free to submit issues or pull requests for improvements! Please make sure to update tests as appropriate.