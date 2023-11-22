import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from "~/redux/reducers/Caregory/getAllCategories";

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
  const dispatch=useDispatch();
  const { dataCate, loadingCate, errorCate } = useSelector((state) => state.categories);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    dispatch(fetchCategories());
}, []);
useEffect(() => {
  setCategories(dataCate);
  console.log(dataCate);
}, [dataCate])

  return (
    <>
      <div className='category'>
        {dataCate.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              <span>{value.name}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Categories