# NOTES

add css layout 
fix design and links
fix github page
fix beef hook src ip:3000/beef/demo/index.html

go to html editor 
<html>

<head>
</head>

<body>
	<button onclick="openGame()">Open Game</button>
	<script>
		function openGame() {
var win = window.open()
var url = "https://finschools.trantuete.net"
var iframe = win.document.createElement('iframe')
iframe.style.width = "100%";
iframe.style.height = "100%";
iframe.style.border = "none";
iframe.src = url
win.document.body.appendChild(iframe)
}
	</script>
</body>

</html>
