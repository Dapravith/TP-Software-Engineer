<%@ page isELIgnored="false" %>
<%@ page import="tp15.*" %>

<jsp:useBean id="userMg" class="tp15.UserMgmt" type="tp15.UserMgmt"/>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">  
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
  <meta name="generator" content="Jekyll v4.1.1">
  <title>Sign in</title>
  <script src="./assets/tailwindcss.js"></script>
  <link rel="stylesheet" href="./assets/styles.css">
</head>

<body class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
    <div class="container rounded-lg mx-auto">
      <form class=" w-[460px] mx-auto" method="post" action="login.jsp">
        <h1 class="text-[2rem] text-center mb-4">Please Sign In</h1>
        <!-- <p class="text-center">It's free and only takes a minute.</p> -->
        <div class="inputWrapper">
          <label for="username">Username</label> <br>
          <input type="text" name="username" class="input" required>
        </div>
        <div class="inputWrapper">
          <label for="password">Password</label> <br>
          <input type="password" name="password" class="input" required>
        </div>
        <button type="submit"
          class="bg-[#49C1A2] text-white w-full rounded-lg h-[52px] mt-4 text-[1.2rem] font-bold">Sign In</button>
      </form>
      <center>
        <input class="items-end w-[460px] my-4 bg-[#f97316] text-white h-[52px] text-[1.2rem] font-bold rounded-lg"
         type=button onClick="location.href='./index.jsp'" value='Go to Home page'>
        <!-- <p class="text-center">By clicking the Sign Up button, you agree to our <br>
          <span class="text-[#49C1A2]"> Terms & Conditions</span>, and <span class="text-[#49C1A2]"> Privacy
            Policy</span>.
        </p> -->
      </center>
    </div>


</body>

</html>