import * as modbus from "modbus-mobile";

// $ExpectType void
modbus.tcp.connect(502, "134.2.56.231", { debug: "automaton-2454" }, (
    err, // $ExpectType Error | null
    connection // $ExpectType TCPStream
) => {
    // ...
});
