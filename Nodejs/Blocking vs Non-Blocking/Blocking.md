Blocking is when the execution of JS in the Nodejs process must wait until non-Javascript operation completes.

Pure CPU-intensive JS (long loops, heavy math) starves the event loop too, but it's not called 'blocking'.

