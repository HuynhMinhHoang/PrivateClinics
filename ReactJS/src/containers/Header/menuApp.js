export const adminMenu = [
  {
    //quản lý người dùng
    name: "menu.admin.manager-user",
    menus: [
      //manager crud
      {
        name: "menu.admin.crud",
        link: "/system/user-manager",
      },

      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },

      //manager role
      {
        name: "menu.admin.manager-doctor",
        link: "/system/manager-doctor",
      },

      {
        name: "menu.doctor.manager-schedule",
        link: "/doctor/manager-schedule",
      },
    ],
  },

  {
    //quản lý phòng khám
    name: "menu.admin.clinic",
    menus: [
      //manager clinic
      {
        name: "menu.admin.manager-clinic",
        link: "/system/manager-clinic",
      },
    ],
  },

  {
    //quản lý chuyên khoa
    name: "menu.admin.specialty",
    menus: [
      //manager specialty
      {
        name: "menu.admin.manager-specialty",
        link: "/system/manager-specialty",
      },
    ],
  },

  {
    //quản lý cẩm nang
    name: "menu.admin.handbook",
    menus: [
      //manager handbook
      {
        name: "menu.admin.manager-handbook",
        link: "/system/manager-handbook",
      },
    ],
  },
];

export const doctorMenu = [
  {
    name: "menu.admin.manager-user",
    menus: [
      //quản lý kế hoạch doctor
      {
        name: "menu.doctor.manager-schedule",
        link: "/doctor/manager-schedule",
      },
    ],
  },
];
