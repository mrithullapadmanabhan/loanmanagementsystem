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
import { createMake, deleteMake, getMake, getMakes, getMakesByCategory, updateMake } from './makeApi';
import { makeObjectType, makeType } from './makeType';

const makeAdapter = createEntityAdapter<makeType>()

export const get = createAsyncThunk<makeType[]>('make/get', async () => {
    return await getMakes();
})
export const getById = createAsyncThunk<makeType, string>('make/getByID', async (id) => {
    return await getMake(id);
})
export const getByCategory = createAsyncThunk<makeType[], string>('make/get', async (categoryId) => {
    return await getMakesByCategory(categoryId);
})
export const create = createAsyncThunk<makeType, makeObjectType>('make/create', async (data) => {
    return await createMake(data);
})
export const update = createAsyncThunk<makeType, { id: string, data: makeType }>('make/update', async ({ id, data }) => {
    return await updateMake(id, data);
})
export const remove = createAsyncThunk<string, string>('make/delete', async (id) => {
    await deleteMake(id);
    return id;
})

const makeSlice = createSlice({
    name: 'makes',
    initialState: makeAdapter.getInitialState({
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
        builder.addCase(get.fulfilled, makeAdapter.setAll)
        builder.addCase(getById.fulfilled, makeAdapter.setOne)
        builder.addCase(getByCategory.fulfilled, makeAdapter.setMany)
        builder.addCase(create.fulfilled, makeAdapter.addOne)
        builder.addCase(update.fulfilled, makeAdapter.setOne)
        builder.addCase(remove.fulfilled, makeAdapter.removeOne)
    }
})

export default makeSlice.reducer

export const { selectAll: selectAllMake, selectById: selectMakeById } =
    makeAdapter.getSelectors((state: RootState) => state.make)