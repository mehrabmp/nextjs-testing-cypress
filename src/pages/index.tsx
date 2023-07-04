import type { SubmitHandler } from 'react-hook-form';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@/components/ui';
import { signIn } from 'next-auth/react';

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty('Please enter email address')
    .email('Please enter valid email address'),
  password: z
    .string()
    .nonempty('Please enter password')
    .min(6, `Password must be at least 6 characters long`)
    .max(50, `Password can't be more than 50 characters long`),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export default function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async values => {
    const status = await signIn('sign-in', {
      callbackUrl: '/dashboard',
      redirect: false,
      email: values.email,
      password: values.password,
    });

    console.log(status);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center p-5">
        <div className="mb-10 flex flex-col items-center justify-center space-y-1">
          <h1 className="text-4xl font-medium">Welcome back</h1>
          <h2 className="font-normal">Please enter your details.</h2>
        </div>
        <form
          className="w-full max-w-xs space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              placeholder="Enter your email"
              error={errors.email && errors.email.message}
              {...register('email')}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              placeholder="Enter your password"
              error={errors.password && errors.password.message}
              {...register('password')}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 focus:ring-blue-700"
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link href={'/'} className="font-medium text-blue-500">
              Forget password
            </Link>
          </div>
          <Button type="submit">Sign in</Button>
          <h3 className="text-center text-sm font-medium">
            Don&apos;t have an account?{' '}
            <Link href={''} className="text-blue-500">
              Sign up
            </Link>
          </h3>
        </form>
      </div>
    </>
  );
}
