# Contributing

Thanks for considering a contribution! The project uses Deno — follow the steps below to get started.

## Prerequisites

- Install Deno: https://docs.deno.com/runtime/getting_started/installation/

## Initialize project

```ps
deno run init
```

## Local development

- Start preview server:

```ps
deno run dev
```

- Check formatting and run quick build checks:

```ps
deno run ok
```

## Build tasks

- Build OpenAPI schemas:

```ps
deno run build
```

- Generate client types for the examples:

```ps
deno run build:client
```
