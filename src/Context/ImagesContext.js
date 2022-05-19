import { createContext } from "react";

const ImagesContext = createContext();
export const ImagesProvider = ({ children }) => {
  const ImagesCollection = [
    {
      image: "Image/Collection/Beaches1.webp",
      title: "Beaches",
    },
    {
      image: "Image/Collection/Birds1.webp",
      title: "Birds",
    },
    {
      image: "Image/Collection/Beaches2.webp",
      title: "Beaches",
    },
    {
      image: "Image/Collection/Mountains1.webp",
      title: "Mountains",
    },
    {
      image: "Image/Collection/Birds2.webp",
      title: "Birds",
    },
    {
      image: "Image/Collection/Birds3.webp",
      title: "Birds",
    },
    {
      image: "Image/Collection/Mountains2.webp",
      title: "Mountains",
    },
    {
      image: "Image/Collection/Beaches4.webp",
      title: "Beaches",
    },
    {
      image: "Image/Collection/Bikes1.webp",
      title: "Bikes",
    },
    {
      image: "Image/Collection/Mountains3.webp",
      title: "Mountains",
    },
    {
      image: "Image/Collection/Bikes2.webp",
      title: "Bikes",
    },
    {
      image: "Image/Collection/Beaches5.webp",
      title: "Beaches",
    },
    {
      image: "Image/Collection/Birds4.webp",
      title: "Birds",
    },
    {
        image: "Image/Collection/Bikes3.webp",
        title: "Bikes",
      },
      {
        image: "Image/Collection/Mountains4.webp",
        title: "Mountains",
      },
      {
        image: "Image/Collection/Birds5.webp",
        title: "Birds",
      },
      {
        image: "Image/Collection/Beaches6.webp",
        title: "Beaches",
      },
      {
        image: "Image/Collection/Birds6.webp",
        title: "Birds",
      },
      {
        image: "Image/Collection/Mountains5.webp",
        title: "Mountains",
      },
      {
        image: "Image/Collection/Bikes4.webp",
        title: "Bikes",
      },
      {
        image: "Image/Collection/Beaches7.webp",
        title: "Beaches",
      },
      {
        image: "Image/Collection/Mountains6.webp",
        title: "Mountains",
      },
      {
        image: "Image/Collection/Birds7.webp",
        title: "Birds",
      },
      {
        image: "Image/Collection/Bikes5.webp",
        title: "Bikes",
      },
      {
        image: "Image/Collection/Birds8.webp",
        title: "Birds",
      },
      {
        image: "Image/Collection/Bikes6.webp",
        title: "Bikes",
      }
  ];

  return <ImagesContext.Provider value={{ImagesCollection}}>{children}</ImagesContext.Provider>;
};

export default ImagesContext;
