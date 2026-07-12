import { Schema, model } from "mongoose";

export const Role = {
  EMPLOYEE: "Employee",
  DEPARTMENT_HEAD: "Department Head",
  ASSET_MANAGER: "Asset Manager",
  ADMIN: "Admin",
};

export const Status = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};

const employeeSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.EMPLOYEE,
    },

    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.ACTIVE,
    },

    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default model("Employee", employeeSchema);
