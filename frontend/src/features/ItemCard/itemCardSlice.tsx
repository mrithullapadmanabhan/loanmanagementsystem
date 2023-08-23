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
import { createItemCard, deleteItemCard, getItemCard, getItemCards, getItemCardsByEmployee, getItemCardsByMake, updateItemCard } from './itemCardApi';
import { itemCardObjectType, itemCardType } from './itemCardType';

const itemCardAdapter = createEntityAdapter<itemCardType>()

export const get = createAsyncThunk<itemCardType[]>('itemCard/get', async () => {
    return await getItemCards();
})
export const getById = createAsyncThunk<itemCardType, string>('itemCard/getById', async (id) => {
    return await getItemCard(id);
})
export const getByEmployee = createAsyncThunk<itemCardType[], string>('itemCard/get', async (employeeID) => {
    return await getItemCardsByEmployee(employeeID);
})
export const getByMake = createAsyncThunk<itemCardType[], string>('itemCard/get', async (makeId) => {
    return await getItemCardsByMake(makeId);
})
export const create = createAsyncThunk<itemCardType, itemCardObjectType>('itemCard/create', async (data) => {
    return await createItemCard(data);
})
export const update = createAsyncThunk<itemCardType, { id: string, data: itemCardType }>('itemCard/update', async ({ id, data }) => {
    return await updateItemCard(id, data);
})
export const remove = createAsyncThunk<string, string>('itemCard/delete', async (id) => {
    await deleteItemCard(id);
    return id;
})

const itemCardSlice = createSlice({
    name: 'itemCards',
    initialState: itemCardAdapter.getInitialState({
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
        builder.addCase(get.fulfilled, itemCardAdapter.setAll)
        builder.addCase(getById.fulfilled, itemCardAdapter.setOne)
        builder.addCase(getByEmployee.fulfilled, itemCardAdapter.setMany)
        builder.addCase(getByMake.fulfilled, itemCardAdapter.setMany)
        builder.addCase(create.fulfilled, itemCardAdapter.addOne)
        builder.addCase(update.fulfilled, itemCardAdapter.setOne)
        builder.addCase(remove.fulfilled, itemCardAdapter.removeOne)
    }
})

export default itemCardSlice.reducer

export const { selectAll: selectAllItemCard, selectById: selectItemCardById } =
    itemCardAdapter.getSelectors((state: RootState) => state.itemCard)