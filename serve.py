import http.server
import socketserver


class MyHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='.', **kwargs)


if __name__ == '__main__':
    PORT = 8000

    with socketserver.TCPServer(("", PORT), MyHTTPHandler) as httpd:
        print(f"Serving at port {PORT}")
        httpd.serve_forever()
