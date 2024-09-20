import { IUserAuth } from "@/interfaces/user";
import { Dispatch, useContext, useState } from "react";
import { loginSchema, LoginType } from "@/validation/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FetchResult, MutationFunctionOptions, useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/queries/auth";
import { useRouter } from "next/navigation";
import { showErrorToast } from "@/utils/toast";
import { DispatchProps, MonitorContext } from "@/context/MonitorContext";
// import { Auth, FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
// import firebaseApp from "../firebase";

export const useLogin = (): IUserAuth => {
    const { dispatch } = useContext(MonitorContext);
    const [validationErrors, setValidationErrors] = useState<LoginType>({
        email: '',
        password: '',
    });
    const router: AppRouterInstance = useRouter();
    const [loginUser, { loading }] = useMutation(LOGIN_USER);

    const onLoginSubmit = async (formData: FormData): Promise<void> => {
        const resultSchema = loginSchema.safeParse(Object.fromEntries(formData));
        console.log(resultSchema.success);
        if (!resultSchema.success) {
            setValidationErrors({
                email: resultSchema.error.format().email?._errors[0]!,
                password: resultSchema.error.format().password?._errors[0]!,
            });
        } else {
            submitUserData(resultSchema.data, loginUser, dispatch, router, 'email/password');
        }
    }

    return {
        loading,
        validationErrors,
        setValidationErrors,
        onLoginSubmit
    }
}


async function submitUserData(
    data: LoginType,
    loginUserMethod: (options?: MutationFunctionOptions | undefined) => Promise<FetchResult>,
    dispatch: Dispatch<DispatchProps>,
    router: AppRouterInstance,
    authType: string
) {
    try {
        const variables = authType === 'social' ? { user: data } : data;
        const result: FetchResult = await loginUserMethod({ variables });
        if (result && result.data) {
            const { loginUser, authSocialUser } = result.data;
            dispatch({
                type: 'dataUpdate',
                payload: {
                    user: authType === 'social' ? authSocialUser.user : loginUser.user,
                    notifications: authType === 'social' ? authSocialUser.notifications : loginUser.notifications
                }
            });
            router.push('/status');
        }
    } catch (error: unknown) {
        showErrorToast(error.message || 'Invalid credentials');
    }
}
