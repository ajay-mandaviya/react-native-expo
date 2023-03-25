import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { ApplicationStateType, ApplicationDispatch } from "../store";
export const useAppSelector: TypedUseSelectorHook<ApplicationStateType> =
  useSelector;
export const useAppDispatch: () => ApplicationDispatch = useDispatch;
