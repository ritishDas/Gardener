import { gardener, replaceElement, fetchElement } from '../gardener.js';

export default function addNotification(noti) {
  console.log('clicked');
  replaceElement(fetchElement('.notification'), Notification(noti));
}

function Notification(notification) {
  if (!notification) return null;

  const statusStyles = {
    success: "bg-[#2e7d32]",
    warning: "bg-[#ed6c02]",
    failure: "bg-[#d32f2f]",
  };


  return gardener({
    "t": "div",
    "cn": [
      "notification",
      "fixed",
      "top-[-60px]",
      "left-0",
      "md:left-auto",
      "md:right-[60px]",
      "right-0",
      "z-50",
      "flex",
      "justify-center",
      "min-w-100",
      "px-4",
      "box-border"
    ],
    "children": [
      {
        "t": "div",
        "cn": [
          "flex",
          "items-center",
          "w-full",
          "max-w-sm",
          "p-4",
          "rounded-2xl",
          "shadow-xl",
          "text-white",
          "backdrop-blur-md",
          "bg-opacity-95",
          statusStyles[notification.status]
        ],
        "children": [
          {
            "t": "div",
            "cn": [
              "flex-1",
              "text-sm",
              "font-medium",
              "tracking-wide"
            ],
            "txt": notification.message
          }
        ]
      }
    ]
  });
}

