
import { ref } from "vue";
import {getDataRequest, getListRequest, postDataRequest, putDataRequest} from "@/latipay/apis/services/BaseService";
import {QuoteResponse} from "@/latipay/apis/models/quote/QuoteResponse";







  export const getQuoteRequest = () => {
    const { responseRef, errorRef, dataRef, getData } =
        getDataRequest<QuoteResponse>();
    const quoteRef = ref<QuoteResponse | null | undefined>(null);

    const getQuoteRef = async (baseCurrency: string, toC: string,amountS : string) => {
      await getData(true, `/quotes/query?fromCurrency=AUD&toCurrency=${toC}&amount=${amountS}&currency=${baseCurrency}&tradeable=true`);
      quoteRef.value = dataRef.value;
      console.log(dataRef.value);
    };

    return { responseRef, errorRef, quoteRef, getQuoteRef };
  };


