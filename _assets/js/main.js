let config = {
	user_id: "645045981238394902",
};

function getAge() {
	const bday = new Date("15 December 2006 00:01:00 PST");
	const ageMs = Date.now() - bday.getTime();

	const MILLISECOND = 1;
	const SECOND = MILLISECOND * 1000;
	const MINUTE = SECOND * 60;
	const HOUR = MINUTE * 60;
	const DAY = HOUR * 24;
	const YEAR = DAY * 365;

	let exact = ageMs / YEAR;

	$("#age").html(`~${exact.toPrecision(7)}`);
}

function gS(id) {
	$.getJSON(`https://api.lanyard.rest/v1/users/${id}`, data => {
		data = data.data;
		let profile = {
			id: id,
			avatar: data.discord_user.avatar,
			type: "png",
		};
		$("#pfp").attr(
			"src",
			`https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${profile.type}?size=128`
		);
		if (data.active_on_discord_mobile && !data.active_on_discord_desktop) {
			$("#online-status").html(`<span style="color: #F2A6AB">on Mobile</span>`);
		} else if (data.active_on_discord_desktop) {
			$("#online-status").html(`<span style="color: #abffbf">Online</span>`);
		} else {
			$("#online-status").html(`<span style="color: #d4d4d4">Offline</span>`);
		}
	});
}

function scrollToTop() {
	$(window).scrollTop(0);
}

gS(config.user_id);

setInterval(gS(config.user_id), 10000);

$(() => {
	getAge();
	particlesJS.load("particles-js", "/_assets/particles.json", function () {
		console.log("callback - particles.js config loaded");
	});
});
