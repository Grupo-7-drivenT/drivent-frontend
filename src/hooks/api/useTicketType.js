import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketTypeApi from '../../services/ticketTypeApi';

export default function useTicketType() {
  const token = useToken();

  const {
    data: event,
    loading: eventLoading,
    error: eventError,
    act: getAllTicketTypes,
  } = useAsync(() => ticketTypeApi.getAllTicketTypes(token));

  return {
    event,
    eventLoading,
    eventError,
    getAllTicketTypes,
  };
}
