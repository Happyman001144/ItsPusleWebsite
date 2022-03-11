page("*", ctx => {
	page.currentPage = ctx;
	let path = ctx.path == "/" ? "home" : ctx.path;

	$.ajax({
		url: `/_pages/${path}.html`,
		success: content => {
			$("#content").html(content);
			$(".header-link").removeClass("active");
			$(`.header-link[href='${ctx.path}']`).addClass("active");
		},
		error: e => {
			alert(`${e.status} ${e.statusText}`);
			page.back();
		},
	});
});

page({
	hashbang: true,
});
