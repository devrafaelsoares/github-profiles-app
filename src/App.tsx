import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { GithubUserProps, GithubUserReposProps } from '@/types/github-user';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useFetch } from '@/hooks';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import Header from '@/components/Header';
import GithubUser from '@/components/GithubUser';
import GithubUserSkeleton from '@/components/GithubUserSkeleton';

type GithubUserSearch = z.infer<typeof GithubUserSearchSchema>;

const defaultValueGithubUserSearch: GithubUserSearch = {
    username: '',
};

const GithubUserSearchSchema = z.object({
    username: z.string().min(1, 'Campo obrigatório'),
});

export default function App() {
    const { toast } = useToast();
    const [showGithubUser, setShowGithubUser] = useState(false);
    const [githubUserSearch, setGithubUserSearch] = useState('');

    const form = useForm({
        resolver: zodResolver(GithubUserSearchSchema),
        defaultValues: defaultValueGithubUserSearch,
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = form;

    const { data: githubUserData } = useFetch<GithubUserProps, Error>(
        `https://api.github.com/users/${githubUserSearch}`,
        showGithubUser,
        {
            onErrorRetry,
        }
    );

    const { data: githubReposUser } = useFetch<GithubUserReposProps[], Error>(
        `https://api.github.com/users/${githubUserSearch}/repos`,
        !!githubUserData
    );

    function onErrorRetry(err: Error): void {
        if (err.message === '404') {
            setShowGithubUser(false);
            toast({
                title: 'Nome de usuário inválido',
                description: 'O nome de usuário informado não existe',
                variant: 'destructive',
            });
        }
    }

    function onSubmit({ username }: GithubUserSearch): void {
        setGithubUserSearch(username);
        setShowGithubUser(true);
        form.reset(defaultValueGithubUserSearch);
    }

    return (
        <div className="min-w-screen min-h-screen">
            <Header />
            <main className="h-[calc(100vh-96px)]">
                <Toaster />
                <section className="grid w-full h-full md:justify-center md:items-center">
                    <Card className="w-full rounded-none md:w-[850px] md:rounded-xl">
                        <CardHeader className="flex flex-col p-0 py-2 gap-2 items-center justify-between md:p-6 md:my-0 md:flex-row">
                            <div className="flex items-center gap-2 md:px-2">
                                <FaGithub className="size-8 md:size-6" />
                                <CardTitle className="text-2xl md:text-xl">Github Profile</CardTitle>
                            </div>
                            <div className="px-2 flex justify-center items-center !m-0 md:w-72 md:justify-end">
                                <Form {...form}>
                                    <form onSubmit={handleSubmit(onSubmit)} className="relative">
                                        <FormField
                                            control={control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center gap-2 ">
                                                    <FormControl>
                                                        <Input
                                                            className={cn(
                                                                'w-full sm:w-72',
                                                                errors.username && 'border-red-700'
                                                            )}
                                                            placeholder="Insira o nome de usuário do perfil"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="absolute !mt-14" />
                                                    <Button type="submit" className="!mt-0">
                                                        Pesquisar
                                                    </Button>
                                                </FormItem>
                                            )}
                                        />
                                    </form>
                                </Form>
                            </div>
                        </CardHeader>
                        {showGithubUser && (
                            <CardContent>
                                {!githubUserData || !githubReposUser ? (
                                    <GithubUserSkeleton />
                                ) : (
                                    <GithubUser githubUser={githubUserData} githubReposUser={githubReposUser} />
                                )}
                            </CardContent>
                        )}
                    </Card>
                </section>
            </main>
        </div>
    );
}
