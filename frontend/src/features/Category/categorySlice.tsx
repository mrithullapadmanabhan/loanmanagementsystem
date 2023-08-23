import {
    createEntityAdapter,
    createSlice,
    isFulfilled,
    isPending,
    isRejected
} from '@reduxjs/toolkit';
import { RootState } from 'app/store';

import { createAsyncThunk } from 'app/hooks';

import { initialStateType } from 'features/common/initialStateType';
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from './categoryApi';
import { categoryObjectType, categoryType } from './categoryType';

const categoryAdapter = createEntityAdapter<categoryType>()

export const get = createAsyncThunk<categoryType[]>('category/get', async () => {
    return await getCategories();
})
export const getById = createAsyncThunk<categoryType, string>('category/getById', async (id) => {
    return await getCategory(id);
})
export const create = createAsyncThunk<categoryType, categoryObjectType>('category/create', async (data) => {
    return await createCategory(data);
})
export const update = createAsyncThunk<categoryType, { id: string, data: categoryType }>('category/update', async ({ id, data }) => {
    return await updateCategory(id, data);
})
export const remove = createAsyncThunk<string, string>('category/delete', async (id) => {
    await deleteCategory(id);
    return id;
})

const categorySlice = createSlice({
    name: 'categories',
    initialState: categoryAdapter.getInitialState({
        status: 'idle',
        error: ''
    } as initialStateType),
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(isPending, (state, _) => {
            state.status = 'loading'
        })
        builder.addMatcher(isFulfilled, (state, _) => {
            state.status = 'succeeded'
        })
        builder.addMatcher(isRejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ? action.error.message : null;
        })
        builder.addCase(get.fulfilled, categoryAdapter.setAll)
        builder.addCase(getById.fulfilled, categoryAdapter.setOne)
        builder.addCase(create.fulfilled, categoryAdapter.setOne)
        builder.addCase(update.fulfilled, categoryAdapter.setOne)
        builder.addCase(remove.fulfilled, categoryAdapter.removeOne)
    }
})

export default categorySlice.reducer

export const { selectAll: selectAllCategory, selectById: selectCategoryById } =
    categoryAdapter.getSelectors((state: RootState) => state.category)