import { createSlice } from '@reduxjs/toolkit';
import { solicitarGiftCardThunk } from '../thunks/giftCardThunks';

const initialState = {
    montoGift: 1000,
    error: null,
    successMessage: null,
    seleccionarOtroMonto: false,
};

const giftCardSlice = createSlice({
    name: 'giftCard',
    initialState,
    reducers: {
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },
        setMontoGift: (state, action) => {
            state.montoGift = action.payload;
        },
        clearMontoGift: (state) => {
            state.montoGift = 1000;
        },

        habilitarOtroMonto: (state) => {
            state.seleccionarOtroMonto = true;
        },
        deshabilitarOtroMonto: (state) => {
            state.seleccionarOtroMonto = false;
        },
    },
    extraReducers: (builder) => {
        //Cases solicitar giftCard
        builder
            .addCase(solicitarGiftCardThunk.fulfilled, (state, action) => {
                state.error = null;
                state.successMessage = action.payload;
            })
            .addCase(solicitarGiftCardThunk.rejected, (state, action) => {
                state.successMessage = null;
                state.error = action.payload;
            });
    },
});

export const { clearSuccessMessage, setError, setMontoGift, clearMontoGift,habilitarOtroMonto,deshabilitarOtroMonto } = giftCardSlice.actions;
export default giftCardSlice.reducer;