"use strict";
const Caregiver = use("App/Models/Caregiver");
const User = use("App/Models/User");

class CaregiverController {
  async activateCaregiver({ response, params, request }) {
    const { confirmation_key } = params;
    const { password } = request.post();
    try {
      // console.log('confirmation key >> ', confirmation_key)
      const get_caregiver = await Caregiver.query()
        .where("confirmation_token", confirmation_key)
        .first();

      if (!get_caregiver) {
        return response.status(404).json({
          status: "Failed",
          message: "Caregiver is already activated"
        });
      }

      if (!get_caregiver) {
        throw response.status(500).json({
          status: "Failed",
          message: "Caregiver is already activated. Go to log in"
        });
      }

      const get_user = await User.query()
        .where("email", get_caregiver.email)
        .first();

      get_user.password = password;

      get_caregiver.confirmation_token = null;

      const save_user_data = await get_user.save();

      const save_user_data = await get_user.save();

      const save_edited_caregiver = await get_caregiver.save();
      return response.status(202).json({
        status: "Success",
        message: "Caregiver is successfully activated. You can now log in",
        data: save_edited_caregiver
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        status: "Failed",
        message: "Failed Internal server error",
        error: error
      });
    }
  }
  // Added to fetch caregiver profile
  async caregiverProfile({ response, auth }) {
    try {
      const authUser = auth.current.user;
      const caregiver = await User.query()
        .where("id", authUser.id)
        .with("caregiver")
        .first();
      return response.status(200).json({
        status: "Success",
        message: "Successfully fetch profile",
        data: caregiver
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        status: "Failed",
        message: "Failed Internal server error",
        error: error
      });
    }
  }
  // Added to edit caregiver profile
  async update({ request, params, response }) {
    const { user_id } = params;
    const { name, phone_no, relationship, img_url } = request.post();

    try {
      const user = await User.query()
        .where("id", user_id)
        .andWhere("user_type", "caregiver")
        .first();
      // console.log('here >> ', user)
      if (!user) {
        return response.status(404).json({
          status: "Failed",
          message: "User not found"
        });
      }
      const caregiver = await Caregiver.query()
        .where("email", user.email)
        .first();

      caregiver.name = name ? name : caregiver.name;
      caregiver.phone_no = phone_no ? phone_no : caregiver.phone_no;
      caregiver.relationship = relationship
        ? relationship
        : caregiver.relationship;
      caregiver.img_url = img_url ? img_url : caregiver.img_url;

      const updateCaregiver = await caregiver.save();

      return response.status(202).json({
        status: "Success",
        message: "Successfully Updated Profile",
        data: updateCaregiver
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        status: "Failed",
        message: "Failed Internal server error",
        error: error
      });
    }
  }
  async viewCaregiverDashboard({ response, auth }) {
    try {
      const authUser = auth.current.user;
      const caregiver = await Caregiver.query()
        .where("email", authUser.email)
        .with("observation_reports")
        .first();

      return response.status(200).json({
        status: "Success",
        message: "Successfully fetched",
        data: caregiver
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        status: "Failed",
        message: "Failed Internal server error",
        error: error
      });
    }
  }
}

module.exports = CaregiverController;
