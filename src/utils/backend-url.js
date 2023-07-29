const HTTP = "http://";

const server_host = "localhost";
const server_port = "5000";
const server_base = "/api";
export const baseUrl = HTTP + server_host + ":" + server_port + server_base;

const reader_host = "localhost";
const reader_port = ":8080";
const reader_base = "/commandTrigger";
export const readerUrl = HTTP + reader_host + reader_port + reader_base;