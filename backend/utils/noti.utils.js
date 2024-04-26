import { UserProfile } from "../models/userProfile.models.js";
export const notification = async (id, message) => {
  const user = await UserProfile.findById(id);
  let noti = user.notification;
  noti.push("Your request is submitted for Campaign deletion");

  await UserProfile.findByIdAndUpdate(id, { notification: noti });
};

// TODO: handle error
