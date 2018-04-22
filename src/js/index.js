// We want the strict mode for a cleaner and portable code
"use strict";

/** Error Message Information - error codes as key to get error information as value */
var error_msg = {};
error_msg[1000] = "Normal Closure";
error_msg[1001] = "Going Away";
error_msg[1002] = "Protocol error";
error_msg[1003] = "Unsupported Data";
error_msg[1004] = "---Reserved--=";
error_msg[1005] = "No Status Received";
error_msg[1006] = "Abnormal Closure... Probably wrong URL?";
error_msg[1007] = "Invalid Frame Payload Data";
error_msg[1008] = "Policy Violation";
error_msg[1009] = "Message Too Big";
error_msg[1010] = "Mandatory Extension";
error_msg[1011] = "Internal Server Error";
error_msg[1015] = "TLS Handshake";

/** Executes this function when page loads */
window.onload = function(){

    // Initial values
    var ws = null;
    var connected = false;
    var url = null;
    var error = null;

    // HTML elements
    var message_log;
    var control_interface;
    var url_input;
    var url_button;
    var send_button;
    var clear_button;
    var send_area;

    /** Prints message on the terminal message log
     *  @param kind kind must be info, server, client, or error. Otherwise defaults to error.
     *  @param message message to be printed on the log
     */
    var printMessage = function(kind, message){

        // Create message
        var pre = document.createElement("pre");
        pre.classList.add("message");

        // Apply special formatting based on the kind
        if(kind == "info"){
            pre.style.cssText= "text-align:center; font-weight:bold;"
            pre.innerHTML = "INFO: " + message;
        }else if(kind == "server"){
            var span = document.createElement("span");
            span.innerHTML = "SERVER";
            span.classList.add("badge");
            span.classList.add("badge-warning");
            var content = document.createElement("span");
            content.innerHTML = message;
            pre.append(span);
            pre.append(content);
        }else if(kind == "client"){
            var span = document.createElement("span");
            span.innerHTML = "CLIENT ";
            span.classList.add("badge");
            span.classList.add("badge-info");
            var content = document.createElement("span");
            content.innerHTML = message;
            pre.append(span);
            pre.append(content);
        }else{
            pre.innerHTML = "ERROR: " + message;
            pre.style.cssText= "text-align:center; font-weight:bold;color:#990000"
        }

        // Append the message
        message_log.insertBefore(pre, message_log.firstChild);
    }

    var setConnectButton = function(){

        // Re-enable the url input
        url_input.disabled = false;

        // Change button color
        if(url_button.classList.contains("btn-danger")){
            url_button.classList.remove("btn-danger");
        }
        if(!url_button.classList.contains("btn-primary")){
            url_button.classList.add("btn-primary");
        }

        // Set the button label
        url_button.innerHTML = "Connect"

        // Add functionality
        url_button.onclick = function(){

            // Make the connection
            ws = new WebSocket(url_input.value);

            // On open
            ws.onopen = function(event){

                // Update the connected
                connected = true;
                error = null

                // Change send button color
                if(send_button.classList.contains("btn-light")){
                    send_button.classList.remove("btn-light");
                }
                if(!send_button.classList.contains("btn-primary")){
                    send_button.classList.add("btn-primary");
                }

                // Change url button color
                if(url_button.classList.contains("btn-primary")){
                    url_button.classList.remove("btn-primary");
                }
                if(!url_button.classList.contains("btn-danger")){
                    url_button.classList.add("btn-danger");
                }

                // Set the button label
                url_button.innerHTML = "Disconnect"

                // Disable the input
                url_input.disabled = true;

                // Change the button behavior
                url_button.onclick = function(){

                    // Close the WS
                    ws.close(1000);
                }

                // Print the connection
                printMessage("info", ("Connected to " + url_input.value));
            }

            // On message
            ws.onmessage = function(event){
                printMessage("server", event.data);
            }

            // On close
            ws.onclose = function(event){

                // Find reason
                var reason = "Unknown error";
                if(event.code in error_msg){
                    reason = error_msg[event.code];
                }

                // Custom reason message from server if it exists
                if(event.reason != null && event.reason != ""){
                    reason = event.reason;
                }

                // If close event was a result of error, make it an error
                if(error != null){
                    printMessage("error", "The connection is closed. Code: " + event.code + " Reason: " + reason);
                }else{
                    printMessage("info", "The connection is closed. Code: " + event.code + " Reason: " + reason);
                }

                // Clean up
                ws = null;
                connected = false;
                error = null;

                // Reset the button
                setConnectButton();
            }

            // On error
            ws.onerror = function(event){
                error = event;
            }
        };

        // Change send button color
        if(send_button.classList.contains("btn-primary")){
            send_button.classList.remove("btn-primary");
        }
        if(!send_button.classList.contains("btn-light")){
            send_button.classList.add("btn-light");
        }

        // Make it appear
        url_button.style.display = 'block';
    };

    // Check WebSocket support
    if ( 'WebSocket' in window && window.WebSocket.CLOSING === 2){

        // Grab the elements on HTML
        // Get the terminal message
        message_log = document.getElementById("messages");
        if(message_log == null){
            console.log("Error: Cannot find messages element!");
            return;
        }

        // Get the interface
        control_interface = document.getElementById("interface");
        if(control_interface == null){
            console.log("ERROR: Cannot find control interface!");
            return;
        }

        // Grab the button
        var url_button = document.getElementById("url-submit");
        if(url_button == null){
            console.log("Error: Cannot find url-submit button!");
            return;
        }

        // Get the send button
        send_button = document.getElementById("send-submit");
        if(send_button == null){
            console.log("ERROR: Cannot find send-submit button!");
            return;
        }

        // Grab the url input
        var url_input = document.getElementById("url");
        if(url_input == null){
            console.log("Error: Cannot find url input!");
            return;
        }

        // Grab the send area input
        send_area = document.getElementById("send-area");
        if(send_area == null){
            console.log("ERROR: Cannot find send-area textarea!");
            return;
        }

        // Grab the send area input
        clear_button = document.getElementById("clear-button");
        if(clear_button == null){
            console.log("ERROR: Cannot find clear-button button!");
            return;
        }

        // Unhide the interface
        control_interface.hidden = false;

        // Set up the button
        setConnectButton();

        // Set up the send button
        send_button.onclick = function(){
            if(connected && ws != null){
                printMessage("client", send_area.value);
                ws.send(send_area.value);
            }else{
                alert("You are not currently connected to a server. Initiate a connection before trying again.");
            }
        }

        // Set up the clear button
        clear_button.onclick = function(){
            while (message_log.firstChild) message_log.removeChild(message_log.firstChild);
            message_log.innerHTML = '<pre class="message" style="text-align:center"><small>Terminal Cleared</small></pre>';
        }
    }else{

        // Display the warning for no WebSocket support
        var warning = document.getElementById("no-ws-warning");
        if(warning == null){
            console.log("ERROR: Cannot find no-ws-warning label!");
            return;
        }
        warning.hidden=false;
    }
};
