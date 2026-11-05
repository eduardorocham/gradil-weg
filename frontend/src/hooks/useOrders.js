import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { calculateOrder, confirmOrder, listOrders } from '../services/api';

const ORDERS_KEY = ['orders'];

export const useOrders = () =>
  useQuery({ queryKey: ORDERS_KEY, queryFn: listOrders });

export const useCalculateOrder = () =>
  useMutation({ mutationFn: calculateOrder });

export const useConfirmOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: confirmOrder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ORDERS_KEY }),
  });
};
