const sql = `with "colCards" as (
  select c."columnId", array_to_json(array_agg(json_build_object(
    'cardId', "cardId",
    'name', "name",
    'description', "description"
  ))) as matching
  from (
    select
      "boardId",
      "cardId",
      "columnId",
      "name",
      "description"
    from cards
  ) as c
  group by c."columnId"
), "cols" as (
  select cols."boardId", array_to_json(array_agg(json_build_object(
    'columnId', "columnId",
    'name', "name",
    'cards', "cards"
  ))) as matching
  from (
    select
      "boardId",
      "columnId",
      "name",
      coalesce((select matching from "colCards" where "colCards"."columnId" = c."columnId"), '[]'::json) as cards
    from columns c
  ) as cols
  group by cols."boardId"
)
select
  "boardId",
  "name",
  coalesce((select matching from "cols" where "cols"."boardId" = b."boardId"), '[]'::json) as columns
from boards b
where b."boardId" = $1;`;

module.exports = { sql };
