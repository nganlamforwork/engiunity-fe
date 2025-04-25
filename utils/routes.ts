import {
  BookOpenText,
  CaseUpper,
  Ellipsis,
  GalleryVerticalEnd,
  Headphones,
  Mic,
  Pencil,
  Text,
} from "lucide-react";

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
        listening: {
          value: "/learning/practice/listening",
        },
        reading: {
          value: "/learning/practice/reading",
        },
        speaking: {
          value: "/learning/practice/speaking",
        },
        writing: {
          value: "/learning/practice/writing",
        },
      },
    },
  },
};

export const sideBarData = {
  teams: [
    {
      name: "Engiunity",
      logo: GalleryVerticalEnd,
      plan: "Kì thi IELTS",
    },
  ],
  practice: [
    {
      name: "Đọc",
      url: "/learning/practice/reading",
      icon: BookOpenText,
    },
    {
      name: "Nghe",
      url: "/learning/practice/listening",
      icon: Headphones,
    },
    {
      name: "Viết",
      url: "/learning/practice/writing",
      icon: Pencil,
    },
    {
      name: "Nói",
      url: "/learning/practice/speaking",
      icon: Mic,
    },
    {
      name: "Khác",
      url: "/learning/practice/others",
      icon: Ellipsis,
      items: [
        {
          name: "Học từ vựng",
          url: "/learning/practice/others/vocabulary",
          icon: CaseUpper,
        },
        {
          name: "Idioms & Collocations",
          url: "/learning/practice/others/idoms",
          icon: Text,
        },
      ],
    },
  ],
};
