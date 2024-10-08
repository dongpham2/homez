import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    wards: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    bathRooms: {
      type: Number,
      required: true,
    },
    bedRooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    typeofrealestate: {
      type: String,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
    save: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

const List = mongoose.model("List", listSchema);

export default List;
