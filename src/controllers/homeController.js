const express = require("express");
import tourService from "../service/tourService";
let getHomePage = async (req, res) => {
  return res.render("shop/index", {
    // pageTitle: "Shop",
    path: "/",
  });
};

let getLogin = async (req, res) => {
  return res.render("login.ejs");
};
let getSignUp = async (req, res) => {
  return res.render("signUp.ejs");
};

let getDataTour = async (req, res, next) => {
  try {
    console.log(req.query);
    let tours = await tourService.filterTour(req.query);
    res.render("shop/filter-list-tour.ejs", {
      tours,
      path: "/",
    });
  } catch (e) {
    console.log(e);
  }
};

let getDataTourCommon = async (req, res, next) => {
  try {
    console.log("tung dang lam phan nay");
    let toursCommon = await tourService.filterTourCommon(req.query);
    console.log(toursCommon);
    res.render("shop/filter-common.ejs", {
      tours: toursCommon,
      path: "/",
    });
  } catch (e) {
    console.log(e);
  }
};

const getTourDetail = async (req, res) => {
  try {
    const tourId = req.params.id;
    console.log(tourId);
    console.log("...............................................");
    const tour = await tourService.getTourById(tourId);

    if (tour) {
      res.render("shop/detail-tour.ejs", { tour: tour }); // Render trang chi tiết tour với dữ liệu từ csdl
    } else {
      res.status(404).send("Tour not found");
    }
  } catch (error) {
    console.error("Error fetching tour details:", error);
    res.status(500).send("Internal Server Error");
  }
};


module.exports = {
  getHomePage: getHomePage,
  getLogin: getLogin,
  getSignUp: getSignUp,
  getDataTour: getDataTour,
  getDataTourCommon: getDataTourCommon,
  getTourDetail: getTourDetail,

};
