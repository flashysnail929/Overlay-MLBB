import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HEROES } from "@/stores/heroes";
import {
  useCurrentGame,
  useCurrentMatch,
  useLeftTeam,
  useMatchActions,
  useRightTeam,
  useTeamActions,
} from "@/stores/match-store";

type FormControlsProps = {
  side: "left" | "right";
};

export default function FormControls({ side }: FormControlsProps) {
  const leftTeam = useLeftTeam();
  const rightTeam = useRightTeam();
  const { updateLeftTeam, updateRightTeam } = useTeamActions();

  const currentMatch = useCurrentMatch();
  const currentGame = useCurrentGame();
  const { setDraftForGame } = useMatchActions();

  // useEffect(() => {
  //   console.log(currentMatch);
  //   console.log(currentGame);
  // }, [currentGame, currentMatch]);

  const heroOptions = HEROES.map((hero) => ({
    label: hero.name,
    value: hero.slug,
  }));

  if (!currentMatch) {
    return <div>Kontrol</div>;
  }

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>{side === "left" ? "Left" : "Right"} Team</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor={`${side}-church`}>Church Name</FieldLabel>
            <Input
              id={`${side}-church`}
              placeholder="Freemason"
              value={
                side === "left" ? leftTeam.church?.name : rightTeam.church?.name
              }
              onChange={(e) => {
                if (side === "left") {
                  updateLeftTeam({
                    church: { ...leftTeam.church, name: e.target.value },
                  });
                } else {
                  updateRightTeam({
                    church: { ...rightTeam.church, name: e.target.value },
                  });
                }
              }}
            />
          </Field>
          <div className="flex flex-row items-center gap-3">
            <Field>
              <FieldLabel htmlFor={`${side}-team-name`}>Team Name</FieldLabel>
              <Input
                id={`${side}-team-name`}
                placeholder="Ghostemane"
                value={side === "left" ? leftTeam.name : rightTeam.name}
                onChange={(e) => {
                  if (side === "left") {
                    updateLeftTeam({ name: e.target.value });
                  } else {
                    updateRightTeam({ name: e.target.value });
                  }
                }}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor={`${side}-team-tag`}>Team Tag</FieldLabel>
              <Input
                id={`${side}-team-tag`}
                placeholder="GSTM"
                maxLength={4}
                value={side === "left" ? leftTeam.tag : rightTeam.tag}
                onChange={(e) => {
                  if (side === "left") {
                    updateLeftTeam({ tag: e.target.value.toUpperCase() });
                  } else {
                    updateRightTeam({ tag: e.target.value.toUpperCase() });
                  }
                }}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor={`${side}-team-pic`}>Team Logo</FieldLabel>
              <Input id={`${side}-team-pic`} disabled />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
      <FieldSeparator />
      <FieldSet>
        <FieldGroup>
          <div className="flex flex-row items-center gap-3">
            <FieldSet className="w-full">
              <FieldLegend>Players</FieldLegend>
              <FieldGroup className="gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Field key={index}>
                    <Input
                      id={`${side}-player-${index}`}
                      placeholder={`Player ${index + 1}`}
                      value={
                        side === "left"
                          ? (leftTeam.players[index]?.nickname ?? undefined)
                          : (rightTeam.players[index]?.nickname ?? undefined)
                      }
                      onChange={(e) => {
                        const nickname = e.target.value;

                        const players =
                          side === "left"
                            ? [...leftTeam.players]
                            : [...rightTeam.players];

                        players[index] = {
                          ...players[index],
                          nickname,
                        };

                        if (side === "left") {
                          updateLeftTeam({ players });
                        } else {
                          updateRightTeam({ players });
                        }
                      }}
                    />
                  </Field>
                ))}
              </FieldGroup>
            </FieldSet>
            <FieldSet className="w-full">
              <FieldLegend>Picks</FieldLegend>
              <FieldGroup className="gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Field key={`pick-${index}`}>
                    <Select
                      items={heroOptions}
                      value={
                        side === "left"
                          ? currentMatch.games[currentGame - 1].leftTeam.picks[
                              index
                            ].heroSlug !== ""
                            ? currentMatch.games[currentGame - 1].leftTeam
                                .picks[index].heroSlug
                            : "idle"
                          : currentMatch.games[currentGame - 1].rightTeam.picks[
                                index
                              ].heroSlug !== ""
                            ? currentMatch.games[currentGame - 1].rightTeam
                                .picks[index].heroSlug
                            : "idle"
                      }
                      onValueChange={(value) => {
                        if (value !== null) {
                          setDraftForGame(`${side}Team`, "picks", index, value);
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-w-xs max-h-52">
                        <SelectGroup>
                          {heroOptions.map((hero) => (
                            <SelectItem key={hero.value} value={hero.value}>
                              {hero.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                ))}
              </FieldGroup>
            </FieldSet>
            <FieldSet className="w-full">
              <FieldLegend>Bans</FieldLegend>
              <FieldGroup className="gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Field key={`ban-${index}`}>
                    <Select
                      items={heroOptions}
                      value={
                        side === "left"
                          ? currentMatch.games[currentGame - 1].leftTeam.bans[
                              index
                            ].heroSlug !== ""
                            ? currentMatch.games[currentGame - 1].leftTeam.bans[
                                index
                              ].heroSlug
                            : "idle"
                          : currentMatch.games[currentGame - 1].rightTeam.bans[
                                index
                              ].heroSlug !== ""
                            ? currentMatch.games[currentGame - 1].rightTeam
                                .bans[index].heroSlug
                            : "idle"
                      }
                      onValueChange={(value) => {
                        if (value !== null) {
                          setDraftForGame(`${side}Team`, "bans", index, value);
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-w-xs max-h-52">
                        <SelectGroup>
                          {heroOptions.map((hero) => (
                            <SelectItem key={hero.value} value={hero.value}>
                              {hero.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                ))}
              </FieldGroup>
            </FieldSet>
          </div>
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  );
}
