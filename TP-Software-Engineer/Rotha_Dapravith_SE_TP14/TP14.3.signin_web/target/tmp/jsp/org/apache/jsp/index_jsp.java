/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: jetty/11.0.7
 * Generated at: 2023-03-14 07:33:29 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.jsp.*;

public final class index_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent,
                 org.apache.jasper.runtime.JspSourceImports {

  private static final jakarta.servlet.jsp.JspFactory _jspxFactory =
          jakarta.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  private static final java.util.Set<java.lang.String> _jspx_imports_packages;

  private static final java.util.Set<java.lang.String> _jspx_imports_classes;

  static {
    _jspx_imports_packages = new java.util.HashSet<>();
    _jspx_imports_packages.add("jakarta.servlet");
    _jspx_imports_packages.add("jakarta.servlet.http");
    _jspx_imports_packages.add("jakarta.servlet.jsp");
    _jspx_imports_classes = null;
  }

  private volatile jakarta.el.ExpressionFactory _el_expressionfactory;
  private volatile org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public java.util.Set<java.lang.String> getPackageImports() {
    return _jspx_imports_packages;
  }

  public java.util.Set<java.lang.String> getClassImports() {
    return _jspx_imports_classes;
  }

  public jakarta.el.ExpressionFactory _jsp_getExpressionFactory() {
    if (_el_expressionfactory == null) {
      synchronized (this) {
        if (_el_expressionfactory == null) {
          _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
        }
      }
    }
    return _el_expressionfactory;
  }

  public org.apache.tomcat.InstanceManager _jsp_getInstanceManager() {
    if (_jsp_instancemanager == null) {
      synchronized (this) {
        if (_jsp_instancemanager == null) {
          _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
        }
      }
    }
    return _jsp_instancemanager;
  }

  public void _jspInit() {
  }

  public void _jspDestroy() {
  }

  public void _jspService(final jakarta.servlet.http.HttpServletRequest request, final jakarta.servlet.http.HttpServletResponse response)
      throws java.io.IOException, jakarta.servlet.ServletException {

    if (!jakarta.servlet.DispatcherType.ERROR.equals(request.getDispatcherType())) {
      final java.lang.String _jspx_method = request.getMethod();
      if ("OPTIONS".equals(_jspx_method)) {
        response.setHeader("Allow","GET, HEAD, POST, OPTIONS");
        return;
      }
      if (!"GET".equals(_jspx_method) && !"POST".equals(_jspx_method) && !"HEAD".equals(_jspx_method)) {
        response.setHeader("Allow","GET, HEAD, POST, OPTIONS");
        response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "JSPs only permit GET, POST or HEAD. Jasper also permits OPTIONS");
        return;
      }
    }

    final jakarta.servlet.jsp.PageContext pageContext;
    jakarta.servlet.http.HttpSession session = null;
    final jakarta.servlet.ServletContext application;
    final jakarta.servlet.ServletConfig config;
    jakarta.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    jakarta.servlet.jsp.JspWriter _jspx_out = null;
    jakarta.servlet.jsp.PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("<!DOCTYPE html>\n");
      out.write("<html lang=\"en\">\n");
      out.write("<head>\n");
      out.write("    <meta charset=\"UTF-8\">\n");
      out.write("    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n");
      out.write("    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n");
      out.write("    <title>TP14.3 Sign Up Account</title>\n");
      out.write("    <script src=\"https://cdn.tailwindcss.com\"></script>\n");
      out.write("</head>\n");
      out.write("<body>\n");
      out.write("    <div class=\"m-auto w-[50%] p-8 flex flex-col items-center shadow-2xl\">\n");
      out.write("        <div class=\"text-[50px]\"><strong>Sign up</strong></div>\n");
      out.write("        <div class=\"text-gray-400\">It's free and only takes a minute.</div>\n");
      out.write("        <div class=\"w-full py-4\">\n");
      out.write("            <label class=\"text-gray-400\" for=\"Username\">Username</label>\n");
      out.write("            <input class=\"w-full p-1 rounded-sm border-2 border-[#9ca3af]\" type=\"text\">\n");
      out.write("        </div>\n");
      out.write("        <div class=\"w-full\">\n");
      out.write("            <label class=\"text-gray-400\" for=\"Email\">Email Address</label>\n");
      out.write("            <input class=\"w-full p-1 rounded-sm border-2 border-[#9ca3af]\" type=\"text\">\n");
      out.write("        </div>\n");
      out.write("        <div class=\"w-full py-4\">\n");
      out.write("            <label class=\"text-gray-400\" for=\"Password\">Password</label>\n");
      out.write("            <input class=\"w-full p-1 rounded-sm border-2 border-[#9ca3af]\" type=\"password\">\n");
      out.write("        </div>\n");
      out.write("        <div class=\"w-full\">\n");
      out.write("            <label class=\"text-gray-400\" for=\"Password\">Confirm Password</label>\n");
      out.write("            <input class=\"w-full p-1 rounded-sm border-2 border-[#9ca3af]\" type=\"password\">\n");
      out.write("        </div>\n");
      out.write("        <div class=\"w-full py-6\">\n");
      out.write("            <button class=\"w-full bg-[#49c1a2] text-white p-1 rounded-sm\" type=\"submit\">Sign Up</button>\n");
      out.write("        </div>\n");
      out.write("        <div class=\"text-gray-400\">By clicking the Sign Up button, you agree to our</div>\n");
      out.write("        <div class=\"text-[#49c1a2]\">Terms & Conditions<span class=\"text-gray-400\">, and </span>Privacy Policy.</div>\n");
      out.write("    </div>  \n");
      out.write("</body>\n");
      out.write("</html>");
    } catch (java.lang.Throwable t) {
      if (!(t instanceof jakarta.servlet.jsp.SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try {
            if (response.isCommitted()) {
              out.flush();
            } else {
              out.clearBuffer();
            }
          } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
