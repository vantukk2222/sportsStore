import React from "react"

const Categories = () => {
  const data = [
    {
      cateImg: "./images/category/cat1.png",
      cateName: "Áo quần",
    },
    {
      cateImg: "./images/category/cat2.png",
      cateName: "Điện tử",
    },
    {
      cateImg: "./images/category/cat3.png",
      cateName: "Đua xe",
    },
    {
      cateImg: "./images/category/cat4.png",
      cateName: "Phụ kiện",
    },
    {
      cateImg: "./images/category/cat5.png",
      cateName: "Quà tặng",
    },
    {
      cateImg: "./images/category/cat6.png",
      cateName: "Music",
    },
    {
      cateImg: "./images/category/cat7.png",
      cateName: "Sức khỏe",
    },
    {
      cateImg: "./images/category/cat8.png",
      cateName: "Thể thao cho pet",
    },
    {
      cateImg: "./images/category/cat9.png",
      cateName: "Thể thao trẻ em",
    },
    {
      cateImg: "./images/category/cat10.png",
      cateName: "Tạp hóa",
    },
    {
      cateImg: "./images/category/cat11.png",
      cateName: "Sách sức khỏe",
    },
  ]

  return (
    <>
      <div className='category'>
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              <img src={value.cateImg} alt='' />
              <span>{value.cateName}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Categories