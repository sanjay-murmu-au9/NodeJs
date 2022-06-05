# Core Modules:-
	http :- lAUNCH A SERVER / SEND REQUEST;
	https :- Launch a ssl server;
	fs
	path
	os


How web work:-
	user/client(browser) --> http:Google.com (domain Lookup)--> 

# const http = require(); --> way to import file in node js;
 
# Streams & Buffers
	Streams :0- is on going process, req is read by node in chunks, and in some point of
        time is done;

# Buffer is constructor which allows you to hold multiple chunks and work with them before 
	they are released;

# res.on('data') --> allow us to listen certain events || data event; 
	1. It fire when ever new chuks is ready to fire; 
	2. func that is responsible for every data event;

# Nodejs is async in nature;

Single Thread, Event Loop & Blocking Code
	#  Node js only uses single javaScript threads/like process in your operating system;


# Single Thread, Event Loop (keep nodejs process code running) & Blocking Code
	# Event loop is automatically as started as Program / Nodejs is started, and is 
	  responsible for event & call back;
	* impotant to understand:- it work only those code which are lighter/ fast executing/finishing code;
	
	AND FILE SYSTEM OPERTION || LONG TAKING OPERATION ARE SEND TO WORKER POOL; 
	# Worker Pool (Do the Heavy Lifting) :- file/ code which take more time to execute 
	  it is send to Worker pool which is manage by nodejs automatically; which is 
	deteched from thread, & can be splited into Different Threads;
 	# And once finish executing code it will Trigger callback for read file operation
	  and hence end up in the Event loop; 

# Event Loop:-	
	1. keep nodejs process code running;
	2. handle all the call back , event
	3  1st check if there are any timer to execute; e.g: setTimeout,setInterval,
	callbacks;
	4. and it check other call back; Pending callbacks; Execute I/O related callbacks 	
		that were deferred;
	5. and then it will look into Poll face; and try to execute those new I/O events,
	 	execute their callbacks;and once call stack is empty it will 

=======================XXXX==============================

Module Summary 
client => Request => server => Response => Client

Program Lifecycle & Event Loop
.Nodejs runs non-blocking js code and uses an event-driven code ("Event Loop") for running 
 your logic;
. A Node program exists as soon as there is no more work to be done;
. Note: The createServer() event never finishes by default;


Asynchronous Code
. JS code is none blocking;
. Js use callbacks and events => Order changes!

# Requests & Responses
. Parse request data in chunks (Streams & Buffers) 
. Avoid "double responses"

# Node.js & Core Modules 
. Node.js ships with multiple core modules (http,fs,path,..)
. core modules can be imported into any file to be used there;
. Import via require('module')


# The Node Module system
. Import via require('./path-to file') for custom files or 
  require('module') for core & third party modules
. Export via module.exports or just exports (for multiple exports)  














