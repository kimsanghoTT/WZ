Kakao.init('f6e5898d19b3ece951546064680a71c4');
Kakao.isInitialized();

const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (code) {
  fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: "85aa9b67b11cb10e750ed2db9f5da229",
      redirect_uri: "https://wzplay.netlify.app/home.html",
      code: code,
    }),
  })
    .then((res) => res.json())
    .then((tokenData) => {
      return fetch("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      });
    })
    .then((res) => res.json())
    .then((userData) => {
      const nickname = userData.kakao_account.profile.nickname;
      const profile = userData.kakao_account.profile.profile_image_url;

      const member = {
        name: nickname,
        profile: profile
      }
      sessionStorage.setItem("member", JSON.stringify(member));

      window.location.href = "home.html";
    })
    .catch((err) => {
      console.error("카카오 로그인 실패", err);
      alert("로그인 실패");
    });
}
