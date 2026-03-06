The phase executes I/O callbacks deferred to the next loop iterator, mainly for system-reported errors like certain TCP socket error (eg ECONNREFUSED)

Core purpose & meaning:
It's not for your app.
It's in internal system operations and errors that are delayed by OS