import { createAsyncThunk } from '@reduxjs/toolkit';
import { solicitarGiftCard} from '../../services/giftCardService';

export const solicitarGiftCardThunk = createAsyncThunk(
  'giftCard/solicitarGiftCard',
  async (datosGitCard, thunkAPI) => {
    try {

      const response = await solicitarGiftCard(datosGitCard);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);