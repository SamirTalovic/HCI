import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import PostDetail from "./app/components/PostDetail";
import AppNavigator from "./app/navigation/AppNavigator";
import TabNavigator from "./app/navigation/TabNavigator";

const markdown = `> "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled".\n\nDemoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble.\n\n[That are](http://google.com) bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.\n\n![shopping carts](https://res.cloudinary.com/dqeiokkem/image/upload/v1641107603/jbzovvbpcybxbehjmml7.jpg)\n\nThese cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing.\n\n## Choice is untrammelled\n\n* Prevents our being able.\n* To do what we like best.\n* Every pleasure is to be.\n* Welcomed and every pain avoided.\n\nBut in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted.\n\nThe wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.\n\n\`\`\`\nconst test = hello;\n\`\`\``;

export default function App() {
  // return (
  //   <PostDetail
  //     post={{
  //       title: "Why you shoud use next-js ok normal thing for blogs?",
  //       content: markdown,
  //       author: "Admin",
  //       createdAt: "Sun Jan 02 2022 22:13:54 GMT+0530 (India Standard Time)",
  //       tags: ["javascript", "react"],
  //       thumbnail: "",
  //     }}
  //   />
  // );

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: "#fff" },
      }}
    >
      <TabNavigator />
    </NavigationContainer>
  );
}

const data = [
  {
    id: "123",
    thumbnail:
      "https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    title: "Know everything about crypto currency about crypto",
    author: "Niraj Dhungana",
  },
  {
    id: "1234",
    thumbnail:
      "https://images.unsplash.com/photo-1640622842223-e1e39f4bf627?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    title: "Programming language to learn in 2022",
    author: "Niraj Dhungana",
  },
  {
    id: "12345",
    thumbnail:
      "https://images.unsplash.com/photo-1590110071064-55d63a0ba3ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    title: "How to make your first app with react and django?",
    author: "Niraj Dhungana",
  },
  {
    id: "123545",
    thumbnail:
      "https://images.unsplash.com/photo-1426023671131-18ce9c8d5f80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    title: "Book to read as a programmer in 2022",
    author: "Niraj Dhungana",
  },
];
