import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

export const GetProducts = createAsyncThunk(
  "Products/GetProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const getProducts = await axios.get("/products");
      return getProducts.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const GetProduct = createAsyncThunk(
  "Products/GetProduct",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const getProduct = await axios.get(`/products/${id}`);
      return getProduct.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const AddProduct = createAsyncThunk(
  "Products/AddProduct",
  async (data, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const AddProduct = await axios.post("/products", {
        img: data.Img,
        title: data.Title,
        price: data.Price,
        info: data.Info,
        category: data.Category,
        quantity: data.Quantity,
      });
      return AddProduct.data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(GetProducts());
    }
  }
);

export const DeleteAll = createAsyncThunk(
  "Products/DeleteAll",
  async (_, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const getAuth = new Cookies();
      const check = getAuth.get("authorization");
      const DelAll = await axios.delete("/products/all", {
        headers: {
          key: check,
        },
      });
      return DelAll.data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(GetProducts());
    }
  }
);

export const DeleteProduct = createAsyncThunk(
  "Products/DeleteProduct",
  async (id, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const DelProduct = await axios.delete(`/products/${id}`);
      return DelProduct.data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(GetProducts());
    }
  }
);

export const UpdateProduct = createAsyncThunk(
  "Products/UpdateProduct",
  async (data, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const UpdProduct = await axios.patch(`/products/${data._Id}`, {
        img: data?.Img,
        title: data?.Title,
        info: data?.Info,
        price: data?.Price,
        category: data?.Category,
        quantity: data?.Quantity,
        status: data?.Status,
      });
      return UpdProduct.data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(GetProducts());
    }
  }
);

const productsSlice = createSlice({
  name: "Products",
  initialState: {
    data: [],
    filter: [],
    products_filter: [],
    loading: false,
    error: null,
  },

  reducers: {
    productsSearch: (state, { payload }) => {
      if (!state.loading) {
        if (payload.find_by === "title") {
          state.filter = state?.data?.filter((e) =>
            e?.title?.toLowerCase()?.includes(payload.value.toLowerCase())
          );
        } else if (payload.find_by === "category") {
          state.filter = state?.data?.filter((e) =>
            e?.category?.toLowerCase()?.includes(payload.value.toLowerCase())
          );
        }
      }
    },

    products_search_user: (state, { payload }) => {
      if (payload.find_by === "title") {
        state.products_filter = state?.data?.filter((e) =>
          e?.title?.toLowerCase()?.includes(payload?.value?.toLowerCase())
        );
        console.log(state.products_filter);
      } else if (payload.find_by === "category") {
        state.products_filter = state?.data?.filter((e) =>
          e?.category?.toLowerCase()?.includes(payload?.value?.toLowerCase())
        );
        console.log(state.products_filter);
      } else if (payload.find_by === "price") {
        state.products_filter = state?.data?.filter(
          (e) => e?.price >= Number(payload.value)
        );
        console.log(state.products_filter);
        return;
      } else if (payload.find_by === "count") {
        state.products_filter = state?.data?.filter(
          (e, i) => i < Number(payload.value)
        );
        console.log(state.products_filter);
      } else {
        state.products_filter = [];
      }
    },

    products_search_user_un_filter: (state, { payload }) => {
      state.products_filter = [];
    },
  },

  extraReducers: (builder) => {
    // Get Products
    builder.addCase(GetProducts.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetProducts.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.filter = state.data;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(GetProducts.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Get Product
    builder.addCase(GetProduct.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetProduct.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(GetProduct.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Add Product
    builder.addCase(AddProduct.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(AddProduct.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(AddProduct.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Delete Product
    builder.addCase(DeleteProduct.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(DeleteProduct.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(DeleteProduct.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Delete All
    builder.addCase(DeleteAll.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(DeleteAll.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(DeleteAll.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const {
  productsSearch,
  products_search_user,
  products_search_user_un_filter,
} = productsSlice.actions;

export default productsSlice.reducer;
