<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home Page</title>
  <script src="./assets/tailwindcss.js"></script>
</head>

<body class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">

  <div class="w-[40%] mx-auto flex justify-center gap-20 text-[1.5rem]">
    <div class="">
      <center>
        <h1 class="mb-2" >Click here to</h1>
        <input class="bg-[#1da1f2] rounded-lg px-10 py-2 text-white shadow-lg" type=button
          onClick="location.href='./task1.jsp'" value='Login'>
      </center>
    </div>
    <div class="">
      <center>
        <h1 class="mb-2">Click here to</h1>
        <input class="bg-[#49C1A2] rounded-lg px-10 py-2 text-white shadow-lg" type=button
          onClick="location.href='./task2.jsp'" value='Sign Up'>
      </center>
    </div>
  </div>
</body>

</html>