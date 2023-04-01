<% tp15.UserMgmt usermgmt=new tp15.UserMgmt(); String userName=request.getParameter("username"); String
  pw=request.getParameter("password"); if(!usermgmt.hasUser(userName, pw)){ response.sendRedirect("task1.jsp"); } %>

  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task01 Login Form</title>
    <script src="./assets/tailwindcss.js"></script>
  </head>

  <body class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
    <div class="text-center text-[2rem]">
      you have been login Successfully! </div>
    <center>
      <div class="flex justify-center items-center gap-4 text-[1.2rem] my-4">
        <p>back to</p>
        <input class="bg-[#3b82f6] rounded-lg px-6 py-2 text-white shadow-lg" type=button
          onClick="location.href='./task1.jsp'" value='Login'>
      </div>
    </center>

  </body>

  </html>