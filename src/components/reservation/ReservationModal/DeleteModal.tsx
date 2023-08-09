"use client";
import * as SVG from "@/components/common/svg";
import KeywordHighlight from "@/components/common/text/KeywordHighlight";
import { ModalProps } from "./ReservationModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReservationData } from "@/lib/api/reservation/method";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DeleteModal = ({ reservationData, off }: ModalProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate } = useMutation(
    async () => {
      return toast.promise(
        deleteReservationData(reservationData.reservationCode as any),
        {
          loading: "기다려주세요...",
          success: "완료",
          error: "Error",
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "reservation",
          reservationData.reservationCode,
        ]);
        queryClient.invalidateQueries(["myReservationCode"]);
        router.replace("/reservation");
      },
    }
  );
  return (
    <div className='relative w-full max-w-md max-h-full'>
      <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
        <button onClick={off}>
          <SVG.Cancel className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white' />
        </button>
        <div className='px-8 py-6 text-center'>
          <div className='my-5 text-md'>
            <KeywordHighlight
              before='해당 예약을'
              keyword={"취소"}
              after={" 하시겠습니까?"}
              color={"text-red-500"}
            />
          </div>
          <button
            onClick={() => {
              mutate();
              off();
            }}
            type='button'
            className='text-white bg-red-500 hover:bg-red-500 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'
          >
            네
          </button>
          <button
            onClick={off}
            type='button'
            className='text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
