import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctor: [],
  allDoctor: [],
  hours: [],

  //table doctor_info
  price: [],
  payment: [],
  province: [],
  specialty: [],
  clinic: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    //gender
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGender = true;
      // console.log("FETCH_GENDER_START", state);

      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      // console.log("FETCH_GENDER_SUCCESS", state);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGender = false;
      state.genders = [];
      console.log("FETCH_GENDER_FAILED", state);

      return {
        ...state,
      };

    //position
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      // console.log("FETCH_POSITION_SUCCESS", state);
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.positions = [];
      // console.log("FETCH_POSITION_FAILED", state);

      return {
        ...state,
      };

    //role
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
      };

    //user
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.data;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USER_FAILED:
      state.users = [];
      return {
        ...state,
      };

    //top doctor
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAILED:
      state.topDoctor = [];
      return {
        ...state,
      };

    //all doctor
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAILED:
      state.allDoctor = [];
      return {
        ...state,
      };

    //chedule hours
    case actionTypes.FETCH_CHEDULE_HOURS_SUCCESS:
      state.hours = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_CHEDULE_HOURS_FAILED:
      state.hours = [];
      return {
        ...state,
      };

    //doctor_info price
    case actionTypes.FETCH_DOCTOR_INFO_PRICE_SUCCESS:
      state.price = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_DOCTOR_INFO_PRICE_FAILED:
      state.price = [];
      return {
        ...state,
      };

    //doctor_info payment
    case actionTypes.FETCH_DOCTOR_INFO_PAYMENT_SUCCESS:
      state.payment = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_DOCTOR_INFO_PAYMENT_FAILED:
      state.payment = [];
      return {
        ...state,
      };

    //doctor_info province
    case actionTypes.FETCH_DOCTOR_INFO_PROVINCE_SUCCESS:
      state.province = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_DOCTOR_INFO_PROVINCE_FAILED:
      state.province = [];
      return {
        ...state,
      };

    //doctor_info province
    case actionTypes.FETCH_SPECIALTY_SUCCESS:
      state.specialty = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_SPECIALTY_FAILED:
      state.specialty = [];
      return {
        ...state,
      };

    //doctor_info clinic
    case actionTypes.FETCH_CLINIC_SUCCESS:
      state.clinic = action.data;
      // console.log("////",state.clinic);
      return {
        ...state,
      };
    case actionTypes.FETCH_CLINIC_FAILED:
      state.clinic = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
