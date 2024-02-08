import { FaUsers } from 'react-icons/fa';
import { RiGitRepositoryFill } from 'react-icons/ri';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { IoIosGitNetwork, IoIosStar, IoMdArrowRoundForward } from 'react-icons/io';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { GithubUserProps, GithubUserReposProps } from '@/types/github-user';
import { Button } from '@/components/ui/button';

type Props = {
    githubUser: GithubUserProps;
    githubReposUser: GithubUserReposProps[];
};

export default function Index({ githubReposUser, githubUser }: Props) {
    const getFourRepositoriesBasedForkAndStars = githubReposUser
        .sort((previousRepositorie, currentRepositorie) => {
            return (
                previousRepositorie.forks - currentRepositorie.forks ||
                previousRepositorie.stargazers_count - currentRepositorie.stargazers_count
            );
        })
        .reverse()
        .slice(0, 4);

    return (
        <div className="flex flex-col md:flex-row">
            <article>
                <Avatar className="flex justify-center md:justify-start">
                    <AvatarImage className="w-56 my-4 rounded-full" src={githubUser.avatar_url} alt="" />
                </Avatar>
                <div className="px-2">
                    <h2 className="text-2xl text-center md:text-start">{githubUser.login}</h2>
                    <div className="flex justify-center items-center gap-2 md:justify-start">
                        <FaUsers />
                        <span>{githubUser.followers} seguidores</span>
                    </div>
                    <div className="flex justify-center items-center gap-2 md:justify-start">
                        <RiGitRepositoryFill />
                        <span>{githubReposUser.length} repositorios</span>
                    </div>
                </div>
            </article>
            <article className="w-full flex flex-col items-center">
                <h2 className="text-center text-3xl py-2 md:py-0">Principais repositórios</h2>
                <div className="w-5/6 grid grid-cols-1 gap-2 py-6 md:grid-cols-2">
                    {getFourRepositoriesBasedForkAndStars.map(({ name, html_url, forks, stargazers_count }, index) => (
                        <Card className="w-full" key={index}>
                            <CardHeader>
                                <CardTitle className="text-center">{name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex justify-center">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-2">
                                        <IoIosGitNetwork />
                                        <span>{forks}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <IoIosStar />
                                        <span>{stargazers_count}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="justify-center">
                                <a href={html_url} target="_blank">
                                    <Button className="flex items-center gap-2">
                                        <span>Ir para o repositório</span>
                                        <IoMdArrowRoundForward />
                                    </Button>
                                </a>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </article>
        </div>
    );
}
