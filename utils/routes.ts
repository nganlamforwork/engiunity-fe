export const routes = {
  pages: {
    landingPage: {
      home: {
        value: "/",
        title: "Trang chủ",
      },
      about: {
        value: "/about",
        title: "Về chúng tôi",
      },
      howToUse: {
        value: "/how-to-use",
        title: "Cách sử dụng",
      },
      demo: {
        value: "/demo",
        title: "Xem demo",
      },
      reviews: {
        value: "/reviews",
        title: "Đánh giá",
      },
      pricing: {
        value: "/pricing",
        title: "Chi phí",
      },
    },
    auth: {
      logIn: { value: "/log-in" },
      signUp: { value: "/sign-up" },
    },
    learning: {
      value: "/learning",
      overview: {
        value: "/learning/overview",
      },
      practice: {
        writing: {
          value: "/learning/practice/writing",
        },
      },
    },
  },
};
