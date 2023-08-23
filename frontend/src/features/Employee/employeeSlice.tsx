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
import { createEmployee, deleteEmployee, getEmployee, getEmployees, updateEmployee } from './employeeApi';
import { employeeObjectType, employeeType } from './employeeType';

const employeeAdapter = createEntityAdapter<employeeType>()

export const get = createAsyncThunk<employeeType[]>('employee/get', async () => {
    return await getEmployees();
})
export const getById = createAsyncThunk<employeeType, string>('employee/getById', async (id) => {
    return await getEmployee(id);
})
export const create = createAsyncThunk<employeeType, employeeObjectType>('employee/create', async (data) => {
    return await createEmployee(data);
})
export const update = createAsyncThunk<employeeType, { id: string, data: employeeType }>('employee/update', async ({ id, data }) => {
    return await updateEmployee(id, data);
})
export const remove = createAsyncThunk<string, string>('employee/delete', async (id) => {
    await deleteEmployee(id);
    return id;
})

const employeeSlice = createSlice({
    name: 'employees',
    initialState: employeeAdapter.getInitialState({
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
        builder.addCase(get.fulfilled, employeeAdapter.setAll)
        builder.addCase(getById.fulfilled, employeeAdapter.setOne)
        builder.addCase(create.fulfilled, employeeAdapter.setOne)
        builder.addCase(update.fulfilled, employeeAdapter.setOne)
        builder.addCase(remove.fulfilled, employeeAdapter.removeOne)
    }
})

export default employeeSlice.reducer

export const { selectAll: selectAllEmployee, selectById: selectEmployeeById } =
    employeeAdapter.getSelectors((state: RootState) => state.employee)