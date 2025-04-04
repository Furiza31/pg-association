import { EmitterType } from "@/types/EmitterType";
import mitt from "mitt";
export const emitter = mitt<EmitterType>();
